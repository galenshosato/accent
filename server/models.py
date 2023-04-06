from sqlalchemy.orm import validates
from extensions import db
from sqlalchemy import JSON

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    name = db.Column(db.String)
    password = db.Column(db.String)
    email = db.Column(db.String)
    texts = db.relationship('Text', backref='user')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "username": self.username,
            "texts": [text.to_dict() for text in self.texts] 
        }

class Text(db.Model):
    __tablename__ = 'texts'

    id = db.Column(db.Integer, primary_key=True)
    text_title = db.Column(db.String)
    text_content = db.Column(db.String)
    transcription = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    text_transcriptions = db.relationship('TextTranscription', backref='text')

    def to_dict(self):
        return {
            "id:": self.id,
            "text_title": self.text_title,
            "text_content": self.text_content,
            "en-us_IPA": self.transcription,
            "user_id": self.user_id,
            "user": self.user.username,
            "transcriptions": [text_tr.to_dict() for text_tr in self.text_transcriptions]
        }
    
class TextTranscription(db.Model):
    __tablename__ = 'text_transcriptions'

    id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String)
    text1 = db.Column(JSON)
    tr1 = db.Column(JSON)
    text2 = db.Column(JSON)
    tr2 = db.Column(JSON)
    text3 = db.Column(JSON)
    tr3 = db.Column(JSON)
    text4 = db.Column(JSON)
    tr4 = db.Column(JSON)
    text5 = db.Column(JSON)
    tr5 = db.Column(JSON)
    text6 = db.Column(JSON)
    tr6 = db.Column(JSON)
    text7 = db.Column(JSON)
    tr7 = db.Column(JSON)
    text_id = db.Column(db.Integer, db.ForeignKey('texts.id'))

    def to_dict(self):
        return {
            "id": self.id,
            "language": self.language,
            "text1": self.text1,
            "tr1": self.tr1,
            "text2": self.text2,
            "tr2": self.tr2,
            "text3": self.text3,
            "tr3": self.tr3,
            "text4": self.text4,
            "tr4": self.tr4,
            "text5": self.text5,
            "tr5": self.tr5,
            "text6": self.text6,
            "tr6": self.tr6,
            "text7": self.text7,
            "tr7": self.tr7
        }

