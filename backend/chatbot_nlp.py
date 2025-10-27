from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import mysql.connector
import re
import random

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

def get_bot_response(user_query):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Nikhil123457@",  # <-- apna password ya '' jo bhi ho daal
        database="college_chatbot"
    )
    cursor = conn.cursor()
    cursor.execute("SELECT question, answer FROM faq_table")
    data = cursor.fetchall()
    questions = [q[0] for q in data]
    answers = [q[1] for q in data]

    # TF-IDF logic
    corpus = [clean_text(q) for q in questions]
    user_query_clean = clean_text(user_query)
    corpus.append(user_query_clean)

    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(corpus)
    similarity = cosine_similarity(vectors[-1], vectors[:-1])
    index = similarity.argmax()

    if similarity[0][index] > 0.4:
        return answers[index]
    else:
        return random.choice(fallbacks)
