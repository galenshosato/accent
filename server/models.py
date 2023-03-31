from sqlalchemy.orm import validates
from extensions import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    name = db.Column(db.String)
    password = db.Column(db.String)
    email = db.Column(db.String)
    texts = db.relationship('Text', backref='user')

class Text(db.Model):
    __tablename__ = 'texts'

    id = db.Column(db.Integer, primary_key=True)
    text_title = db.Column(db.String)
    text_content = db.Column(db.String)
    transcription = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))