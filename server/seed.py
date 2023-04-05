from app import app
from models import Text, User, TextTranscription
from extensions import db  
from test_text import text1
from test import var1, var2, var3, var4, var5, var6
from Text import GenText

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

        text = Text(text_title='Richard III', text_content=text1, user_id= 1)
        db.session.add(text)

        print("Seeding transcriptions")

        var1_text=[]
        var1_tr=[]
        var2_text=[]
        var2_tr=[]
        var3_text=[]
        var3_tr=[]
        var4_text=[]
        var4_tr=[]
        var5_text=[]
        var5_tr=[]
        var6_text=[]
        var6_tr=[]

        for i in var1:
            string_list = i.split('\n')
            for x in string_list:
                if x:
                    new = GenText(x)
                    var1_text.append(x)
                    var1_tr.append(new.get_ipa())
        
        for i in var2:
            string_list = i.split('\n')
            for x in string_list:
                if x:
                    new = GenText(x)
                    var2_text.append(x)
                    var2_tr.append(new.get_ipa())
        
        for i in var3:
            string_list = i.split('\n')
            for x in string_list:
                if x:
                    new = GenText(x)
                    var3_text.append(x)
                    var3_tr.append(new.get_ipa())
        
        for i in var4:
            string_list = i.split('\n')
            for x in string_list:
                if x:
                    new = GenText(x)
                    var4_text.append(x)
                    var4_tr.append(new.get_ipa())
        
        for i in var5:
            string_list = i.split('\n')
            for x in string_list:
                if x:
                    new = GenText(x)
                    var5_text.append(x)
                    var5_tr.append(new.get_ipa())
        
        for i in var6:
            string_list = i.split('\n')
            for x in string_list:
                if x:
                    new = GenText(x)
                    var6_text.append(x)
                    var6_tr.append(new.get_ipa())
        

        

        text_tr = TextTranscription(language = "en-us", text1=var1_text, tr1=var1_tr, text2=var2_text, tr2=var2_tr,
                                    text3=var3_text, tr3= var3_tr, text4=var4_text, tr4=var4_tr, text5=var5_text,
                                    tr5= var5_tr, text6=var6_text, tr6=var6_tr, text_id= 1)
        
        db.session.add(text_tr)
        db.session.commit()