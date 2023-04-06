
import nltk
import math

nltk.download('punkt')

text = text

sentences = nltk.sent_tokenize(text)

length = math.ceil(len(sentences)/ 7)
divided_sentences=[]

while len(sentences) > 0:
    divided_sentences.append(sentences[0:length])
    del sentences[0:length]


    
var1, var2, var3, var4, var5, var6 = divided_sentences


print(var1)
