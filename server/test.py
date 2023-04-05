from test_text import text1, text2, text3, text4
from Text import GenText
import nltk
import math

nltk.download('punkt')

text = text2

sentences = nltk.sent_tokenize(text)

length = math.ceil(len(sentences)/ 7)
divided_sentences=[]

while len(sentences) > 0:
    divided_sentences.append(sentences[0:length])
    del sentences[0:length]


    
var1 = divided_sentences[0]


for i in var1:
    string_list = i.split('\n')
    for x in string_list:
        new = GenText(x)
        print(x)
        print(new.get_ipa())
