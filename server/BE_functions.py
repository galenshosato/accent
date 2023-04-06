from Text import GenText
import nltk
import math
from test_text import text1, text3, text4, text5


def text_to_IPA(text):
    new_tr = GenText(text)

    return new_tr.get_ipa()


def arr4(var1, var2, var3, var4):
    var1_text=[]
    var1_tr=[]
    var2_text=[]
    var2_tr=[]
    var3_text=[]
    var3_tr=[]
    var4_text=[]
    var4_tr=[]

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
    return [var1_text, var1_tr, var2_text, var2_tr, var3_text, var3_tr, var4_text, var4_tr]

def arr5(var1, var2, var3, var4, var5):
    var5_text=[]
    var5_tr=[]
    for i in var5:
        string_list = i.split('\n')
        for x in string_list:
            if x:
                new = GenText(x)
                var5_text.append(x)
                var5_tr.append(new.get_ipa())
    array = arr4(var1, var2, var3, var4)
    array.append(var5_text)
    array.append(var5_tr)
    return array

def arr6(var1, var2, var3, var4, var5, var6):
    var6_text=[]
    var6_tr=[]
    for i in var6:
        string_list = i.split('\n')
        for x in string_list:
            if x:
                new = GenText(x)
                var6_text.append(x)
                var6_tr.append(new.get_ipa())
    array = arr5(var1, var2, var3, var4, var5)
    array.append(var6_text)
    array.append(var6_tr)
    return array

def arr7(var1, var2, var3, var4, var5, var6, var7):
    var7_text=[]
    var7_tr=[]
    for i in var7:
        string_list = i.split('\n')
        for x in string_list:
            if x:
                new = GenText(x)
                var7_text.append(x)
                var7_tr.append(new.get_ipa())
    array = arr6(var1, var2, var3, var4, var5, var6)
    array.append(var7_text)
    array.append(var7_tr)
    return array

def split_text(text):
    if text is None:
        return 
    
    sentences = nltk.sent_tokenize(text)
    length = math.ceil(len(sentences)/ 7)
    divided_sentences=[]

    while len(sentences) > 0:
        divided_sentences.append(sentences[0:length])
        del sentences[0:length]
    
    print(len(divided_sentences))
    print(divided_sentences)

    if len(divided_sentences) == 4:
        print('This hit 4')
        var1, var2, var3, var4 = divided_sentences
        return arr4(var1, var2, var3, var4)
    
    elif len(divided_sentences) == 5:
        print("This hit 5")
        var1, var2, var3, var4, var5 = divided_sentences
        return arr5(var1, var2, var3, var4, var5)
    
    elif len(divided_sentences) == 6:
        print("This hit 6")
        var1, var2, var3, var4, var5, var6 = divided_sentences
        return arr6(var1, var2, var3, var4, var5, var6)
    
    elif len(divided_sentences) == 7:
        print("This hit 7")
        var1, var2, var3, var4, var5, var6, var7 = divided_sentences
        return arr7(var1, var2, var3, var4, var5, var6, var7)
    
    else:
        return

    
if __name__ == '__main__':
    print(split_text(text1))
    print(len(split_text(text1)))



