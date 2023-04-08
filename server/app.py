from flask import Flask, jsonify, request, make_response
from extensions import *
from models import User, Text, TextTranscription
from BE_functions import text_to_IPA, split_text, create_new_tr

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = 'woo secret key'

db.init_app(app)
migrate.init_app(app, db)


@app.route('/')
def home():
    return ''


@app.route('/api/users', methods=['GET', 'POST'])
def get_users():
    if request.method == 'GET':
        users = User.query.all()
        user_dict = [user.to_dict() for user in users]
        return make_response(jsonify(user_dict), 200)
    elif request.method == 'POST':
        new_user = User()
        data = request.get_json()

        for field in data:
            setattr(new_user, field, data[field])
        
        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify(new_user.to_dict()), 201)

@app.route('/api/<string:username>/texts', methods=['GET', 'POST'])
def get_user_texts(username):
    user = User.query.filter_by(username=username).first()
    if request.method == 'GET':
       texts = [text.to_dict() for text in user.texts]
       return make_response(jsonify(texts), 200)
    
    elif request.method == 'POST':
        new_text = Text()
        data = request.get_json()

        for field in data:
            setattr(new_text, field, data[field])
        
        new_text_tr = text_to_IPA(new_text.text_content)
        setattr(new_text, "transcription", new_text_tr)
        
        db.session.add(new_text)
        db.session.commit()

        return make_response(jsonify(new_text.to_dict()), 201)
    

@app.route('/api/<string:username>/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def get_text_by_username_id(username, id):
    user = User.query.filter_by(username = username).first()
    text = Text.query.filter(Text.id==id, Text.user_id==user.id).first()
    if request.method == 'GET':
        text_dict = text.to_dict()
        return make_response(jsonify(text_dict), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()
        for field in data:
            setattr(text, field, data[field])
        
        db.session.add(text)
        db.session.commit()

        return make_response(jsonify(text.to_dict()), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(text)
        db.session.commit()

        return make_response(jsonify({"Text Deleted": "You have successfully deleted this piece of text!"}), 200)

@app.route('/api/<string:username>/<int:id>/tr', methods = ['GET','POST'])
def get_trs_for_text(username, id):
    user = User.query.filter_by(username = username).first()
    text = Text.query.filter(Text.id==id, Text.user_id==user.id).first()

    if request.method == 'GET':
        trs = [tr.to_dict() for tr in text.text_transcriptions]
        return make_response(jsonify(trs), 200)
    
    elif request.method == 'POST':
        data = request.get_json()
        lang = data['language']
        text_content = data['text']

        split = split_text(text_content, lang)
        new_tt = create_new_tr(split, lang, id)
        
        db.session.add(new_tt)
        db.session.commit()

        return make_response(jsonify(new_tt.to_dict()), 201)


@app.route('/api/<string:username>/<int:id>/tr/<string:language>', methods = ['GET', 'DELETE'])
def get_tr_for_piece_by_lang(username, id, language):
    user = User.query.filter_by(username = username).first()
    text = Text.query.filter(Text.id==id, Text.user_id==user.id).first()
    text_transcription = TextTranscription.query.filter(TextTranscription.text_id == text.id, TextTranscription.language == language).first()
    
    if request.method == 'GET':
        text_transcription_dict = text_transcription.to_dict()
        return make_response(jsonify(text_transcription_dict), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(text_transcription)
        db.session.commit()
        return make_response(jsonify({"Transcription Deleted": "You have successfully deleted this transcription"}), 200)


if __name__ == '__main__':
    app.run(port=5555, debug=True)
