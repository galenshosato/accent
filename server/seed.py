from app import app
from models import Text, User
from extensions import db  

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()

        print("Seeding Users...")
        users = [
            User(email='galen.sato@gmail.com', password="lawandorderfiend", name='Galen', username='gmoney'),
            User(email="teconomou7@hotmail.com", password = "knicks4Eva92", name='Teddy', username='TheoTheLeo'),
            User(email="nicksap@ymail.com", password="GreekFreakBucky22", name='Nick', username='bignickenergy'),
            User(email="siddykittens@aol.com", password="wholeFoodsHomie09", name='Sid', username='sid')
        ]

        db.session.add_all(users)
        db.session.commit()