from test_text import text1, text2, text3, text4
from Text import GenText
import nltk
import math

nltk.download('punkt')

text = text1

sentences = nltk.sent_tokenize(text)

length = math.ceil(len(sentences)/ 7)
divided_sentences=[]

while len(sentences) > 0:
    divided_sentences.append(sentences[0:length])
    del sentences[0:length]


    
var1, var2, var3, var4, var5, var6 = divided_sentences


print(var1)
