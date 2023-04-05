from flask import Flask, jsonify, request, make_response
from extensions import *
from models import User, Text

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

@app.route('/username/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def get_text_by_id(id):
    text = Text.query.filter_by(id=id).first()
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)
