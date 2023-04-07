from app import app
from models import Text, User, TextTranscription
from extensions import db  
from test_text import text1
from BE_functions import text_to_IPA, split_text, create_new_tr

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Text.query.delete()
        TextTranscription.query.delete()

        print("Seeding Users...")
        users = [
            User(email='galen.sato@gmail.com', password="lawandorderfiend", name='Galen', username='gmoney'),
            User(email="teconomou7@hotmail.com", password = "knicks4Eva92", name='Teddy', username='TheoTheLeo'),
            User(email="nicksap@ymail.com", password="GreekFreakBucky22", name='Nick', username='bignickenergy'),
            User(email="siddykittens@aol.com", password="wholeFoodsHomie09", name='Sid', username='sid')
        ]

        db.session.add_all(users)

        print("Seeding text")

        text = Text(text_title='Richard III', text_content=text1, transcription=text_to_IPA(text1), user_id= 1)
        db.session.add(text)

        print("Seeding transcriptions")

        split = split_text(text1, "en-us")
        new_tt = create_new_tr(split, "en-us", 1)

        db.session.add(new_tt)
        db.session.commit()