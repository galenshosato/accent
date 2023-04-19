from Text import GenText
import nltk
import math
from test_text import text1, text3, text4
from models import TextTranscription


def text_to_IPA(text):
    new_tr = GenText(text)

    return new_tr.get_ipa()

def arr_func(var1, lang, dialect):
    var1_text=[]
    var1_tr=[]
    for i in var1:
        string_list = i.split('\n')
        for x in string_list:
            if x:
                new = GenText(x)
                var1_text.append(x)
                var1_tr.append(new.get_ipa(lang))
    return [var1_text, var1_tr]

def arr2(var1, var2, lang, dialect):
    var2_text=[]
    var2_tr=[]
    for i in var2:
        string_list = i.split('\n')
        for x in string_list:
            if x:
                new = GenText(x)
                var2_text.append(x)
                var2_tr.append(new.get_ipa(lang))
    array = arr_func(var1, lang, dialect)
    array.append(var2_text)
    array.append(var2_tr)
    return array

def arr3(var1, var2, var3, lang, dialect):
    var3_text=[]
    var3_tr=[]
    for i in var3:
        string_list = i.split('\n')
        for x in string_list:
            if x:
                new = GenText(x)
                var3_text.append(x)
                var3_tr.append(new.get_ipa(lang))
    array = arr2(var1, var2, lang, dialect)
    array.append(var3_text)
    array.append(var3_tr)
    return array


def arr4(var1, var2, var3, var4, lang, dialect):
    var4_text=[]
    var4_tr=[]

    for i in var4:
        string_list = i.split('\n')
        for x in string_list:
            if x:
                new = GenText(x)
                var4_text.append(x)
                var4_tr.append(new.get_ipa(lang))
    array = arr3(var1, var2, var3, lang, dialect)
    array.append(var4_text)
    array.append(var4_tr)
    return array
    

def arr5(var1, var2, var3, var4, var5, lang, dialect):
    var5_text=[]
    var5_tr=[]
    for i in var5:
        string_list = i.split('\n')
        for x in string_list:
            if x:
                new = GenText(x)
                var5_text.append(x)
                var5_tr.append(new.get_ipa(lang))
    array = arr4(var1, var2, var3, var4, lang, dialect)
    array.append(var5_text)
    array.append(var5_tr)
    return array

def arr6(var1, var2, var3, var4, var5, var6, lang, dialect):
    var6_text=[]
    var6_tr=[]
    for i in var6:
        string_list = i.split('\n')
        for x in string_list:
            if x:
                new = GenText(x)
                var6_text.append(x)
                var6_tr.append(new.get_ipa(lang))
    array = arr5(var1, var2, var3, var4, var5, lang, dialect)
    array.append(var6_text)
    array.append(var6_tr)
    return array

def arr7(var1, var2, var3, var4, var5, var6, var7, lang, dialect):
    var7_text=[]
    var7_tr=[]
    for i in var7:
        string_list = i.split('\n')
        for x in string_list:
            if x:
                new = GenText(x)
                var7_text.append(x)
                var7_tr.append(new.get_ipa(lang))
    array = arr6(var1, var2, var3, var4, var5, var6, lang, dialect)
    array.append(var7_text)
    array.append(var7_tr)
    return array

def split_text(text, lang='en-us', dialect='General American'):
    if text is None:
        return 
    
    sentences = nltk.sent_tokenize(text)
    length = math.ceil(len(sentences)/ 7)
    divided_sentences=[]

    while len(sentences) > 0:
        divided_sentences.append(sentences[0:length])
        del sentences[0:length]
    
    if len(divided_sentences) == 1:
        var1 = divided_sentences
        return arr_func(var1, lang, dialect)
    
    elif len(divided_sentences) == 2:
        var1, var2 = divided_sentences
        return arr2(var1, var2, lang, dialect)
    
    elif len(divided_sentences) == 3:
        var1, var2, var3 = divided_sentences
        return arr3(var1, var2, var3, lang, dialect)

    elif len(divided_sentences) == 4:
        var1, var2, var3, var4 = divided_sentences
        return arr4(var1, var2, var3, var4, lang, dialect)
    
    elif len(divided_sentences) == 5:
        var1, var2, var3, var4, var5 = divided_sentences
        return arr5(var1, var2, var3, var4, var5, lang, dialect)
    
    elif len(divided_sentences) == 6:
        var1, var2, var3, var4, var5, var6 = divided_sentences
        return arr6(var1, var2, var3, var4, var5, var6, lang, dialect)
    
    elif len(divided_sentences) == 7:
        var1, var2, var3, var4, var5, var6, var7 = divided_sentences
        return arr7(var1, var2, var3, var4, var5, var6, var7, lang, dialect)
    
    else:
        return

def create_new_tr(array, lang, dialect, id):

    if len(array) == 2:
        text, tr = array
        new_tt = TextTranscription(language = lang, dialect = dialect, text1=text, tr1=tr, text_id = id)
        return new_tt
    elif len(array) == 4:
        text1, tr1, text2, tr2 = array
        new_tt = TextTranscription(language = lang, dialect = dialect, text1=text1, tr1=tr1, text2=text2, tr2=tr2, text_id = id)
        return new_tt
    elif len(array) == 6:
        text1, tr1, text2, tr2, text3, tr3 = array
        new_tt = TextTranscription(language=lang, dialect = dialect, text1=text1, tr1=tr1, text2=text2, tr2=tr2, text3=text3, tr3=tr3, text_id = id)
        return new_tt
    elif len(array) == 8:
        text1, tr1, text2, tr2, text3, tr3, text4, tr4 = array
        new_tt = TextTranscription(language=lang, dialect = dialect, text1=text1, tr1=tr1, text2=text2, tr2=tr2, text3=text3, tr3=tr3,
                                   text4=text4, tr4=tr4, text_id = id)
        return new_tt

    elif len(array) == 10:
        text1, tr1, text2, tr2, text3, tr3, text4, tr4, text5, tr5 = array
        new_tt = TextTranscription(language=lang, dialect = dialect, text1=text1, tr1=tr1, text2=text2, tr2=tr2, text3=text3, tr3=tr3,
                                   text4=text4, tr4=tr4, text5=text5, tr5=tr5, text_id = id)
        return new_tt
    
    elif len(array) == 12:
        text1, tr1, text2, tr2, text3, tr3, text4, tr4, text5, tr5, text6, tr6 = array
        new_tt = TextTranscription(language=lang, dialect = dialect, text1=text1, tr1=tr1, text2=text2, tr2=tr2, text3=text3, tr3=tr3,
                                   text4=text4, tr4=tr4, text5=text5, tr5=tr5, text6=text6, tr6=tr6, text_id = id)
        return new_tt
    
    elif len(array) == 14:
        text1, tr1, text2, tr2, text3, tr3, text4, tr4, text5, tr5, text6, tr6, text7, tr7 = array
        new_tt = TextTranscription(language=lang, dialect = dialect, text1=text1, tr1=tr1, text2=text2, tr2=tr2, text3=text3, tr3=tr3,
                                   text4=text4, tr4=tr4, text5=text5, tr5=tr5, text6=text6, tr6=tr6, text7=text7, tr7=tr7, text_id = id)
        return new_tt
    else:
        return

    
def choose_voice(language_string):
    if language_string == 'en-us':
        return 'Joanna'
    
    elif language_string == 'en':
        return 'Brian'
    
    elif language_string == 'Australian':
        return 'Olivia'
    
    elif language_string == 'fr':
        return 'Lea'
    
    elif language_string == 'de':
        return 'Vicki'
    
    elif language_string == 'pt-br':
        return 'Camila'
    
    elif language_string == 'es':
        return 'Sergio'
    
    elif language_string == 'ru':
        return 'Tatyana'
    
    elif language_string == 'ja':
        return 'Takumi'
    
    else:
        return 'Joanna'
    

