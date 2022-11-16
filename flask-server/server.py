from flask import Flask,request, url_for, redirect, render_template, jsonify, json, session
import pickle
import numpy as np
import pandas as pd
import joblib
import re
# import nltk
import nltk
from nltk.stem.porter import PorterStemmer
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import numpy as np
from nltk.corpus import PlaintextCorpusReader
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

app = Flask(__name__)

clf=pickle.load(open('emotion_model.pkl','rb'))

stop_words = set(stopwords.words('english'))
from nltk.stem import WordNetLemmatizer 
lemmatizer = WordNetLemmatizer() 

def custom_preprocessor(text):
    text = re.sub(r'\W+|\d+|_', ' ', str(text))    #removing numbers and punctuations
    text = nltk.word_tokenize(text)       #tokenizing
    text = [word for word in text if not word in stop_words] #English Stopwords
    text = [lemmatizer.lemmatize(word) for word in text]              #Lemmatising
    return text

@app.route('/home')
def home():
    return {"name":"welcome"}

@app.route('/api', methods=['GET'])
def index():
    return {
        'name':' Hi! Welcome'
    }

@app.route("/members")
def members():
        return{"members":["member1","member2","member3"]}

@app.route('/api/predict',methods=['POST'])
def predict():
    input_data = pd.read_csv("emotion.csv")
    countvec = CountVectorizer(min_df= 5, tokenizer=custom_preprocessor, stop_words=stopwords.words('english'))
    dtm = pd.DataFrame(countvec.fit_transform(input_data['Text'].apply(lambda dtm: np.str_(dtm))).toarray(), columns=countvec.get_feature_names(), index=None)
    #Adding label Column
    dtm['Label'] = input_data['Label'] 
    df_train = dtm[:15000]
    df_test = dtm[15000:]

    clf = MultinomialNB()
    X_train= df_train.drop(['Label'], axis=1)
    #Fitting model to our data
    clf.fit(X_train, df_train['Label'])

    ytb_model=open("emotion_model.pkl","rb")
    clf = joblib.load(ytb_model)
    

    if request.method == 'POST':
        request_data=json.loads(request.data)
        #getting data from the frontend
        mydata=request_data['Text']
        data=[mydata]
        vect = countvec.transform(data).toarray()
        my_prediction = clf.predict(vect)[0]
    return {
           'message':my_prediction
    }

if __name__ == "__main__":
    app.run(debug=True)
 