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

if __name__ == '__main__':
    app.run(port=5555, debug=True)
