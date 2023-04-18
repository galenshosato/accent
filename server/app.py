from flask import Flask, jsonify, request, make_response, Response, session as browser_session
from extensions import *
from models import User, Text, TextTranscription, ExampleText
from BE_functions import text_to_IPA, split_text, create_new_tr, choose_voice

import io
import PyPDF2
import boto3

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


#Routes handling login, checking cookies, and logout
@app.route('/api/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter_by(email=email).first()

        if not user:
            return make_response(jsonify({"error": "invalid login"}))

        browser_session['user_id'] = user.id

        return make_response(jsonify(user.to_dict()), 201)

@app.route('/api/check_session')
def get_user():
    user = User.query.filter(User.id == browser_session.get('user_id')).first()

    if user:
        return jsonify(user.to_dict())
    else:
        return jsonify({'message': '401: Not Authorized'}), 401
    
@app.route('/api/logout', methods=['POST'])
def logout():
    browser_session.clear()
    response = make_response(jsonify({'response':'You have successfully logged out'}), 200)
    response.delete_cookie('browser_session')
    return response


@app.route('/api/process_file', methods=['POST'])
def process_file():
    file = request.files['file']
    file_content = file.read()

    pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
    text = ''
    for page in range(len(pdf_reader.pages)):
        text += pdf_reader.pages[page].extract_text()
    
    return text


@app.route('/api/text_to_speech', methods=['POST'])
def speech_response():
    data = request.get_json()

    text = data['text']
    language = data['language']

    if len(text) > 1:
        new_text = ", ".join(text)
    else:
        new_text = text[0]

    voice = choose_voice(language)

    p_session = boto3.Session(
                    aws_access_key_id='',
                    aws_secret_access_key='',
                    region_name='us-east-1')

    polly_client = p_session.client('polly')

    if voice == 'Tatyana':
        response = polly_client.synthesize_speech(VoiceId= voice,
                OutputFormat='mp3', 
                Text = new_text,
                Engine = 'standard')
        
    else:
        response = polly_client.synthesize_speech(VoiceId = voice,
                    OutputFormat='mp3',
                    Text = new_text,
                    Engine = 'neural')
    
    headers = {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename=speech.mp3'
    }

    return Response(response['AudioStream'].read(), headers=headers)
        

#route to all users
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

#route to the constant texts
@app.route('/api/example_texts')
def get_example_texts():
    texts = ExampleText.query.all()
    texts_to_dict = [text.to_dict() for text in texts]
    return make_response(jsonify(texts_to_dict), 200)

#route to all texts by username
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
