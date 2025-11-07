from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import mysql.connector
import re
import random
from transformers import pipeline

fallbacks = [
    "Hmm... I’m not sure about that yet. You can check the CU website.",
    "I’ll forward your query to the student support team.",
    "Can you please rephrase your question?",
    "I don’t have that information, but I can help with admissions, fees, and courses."
]

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    return text

qa_model = pipeline("question-answering", model="distilbert-base-uncased-distilled-squad")

def get_ai_answer(context, user_query):
    result = qa_model(question=user_query, context=context)
    return result['answer']

def get_bot_response(user_query):
    # ----------- Yahan config update karna hai! -----------
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Nikhil123457@",  # <-- yahan wohi password likh jo tu mysql login karte waqt type karta hai
        database="college_chatbot"
    )
    cursor = conn.cursor()
    cursor.execute("SELECT question, answer FROM faq_table")
    data = cursor.fetchall()
    questions = [q[0] for q in data]
    answers = [q[1] for q in data]

    corpus = [clean_text(q) for q in questions]
    user_query_clean = clean_text(user_query)
    corpus.append(user_query_clean)
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(corpus)
    similarity = cosine_similarity(vectors[-1], vectors[:-1])
    index = similarity.argmax()

    if similarity[0][index] > 0.25:
        cursor.close()
        conn.close()
        return answers[index]
    else:
        context = " ".join([f"Q:{q} A:{a}." for q, a in data])
        try:
            ai_answer = get_ai_answer(context, user_query)
            if ai_answer and ai_answer.strip():
                cursor.close()
                conn.close()
                return ai_answer
        except Exception as e:
            pass
        cursor.close()
        conn.close()
        return random.choice(fallbacks)
