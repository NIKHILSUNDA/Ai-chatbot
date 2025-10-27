from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot_nlp import get_bot_response
import mysql.connector

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_query = data.get('query', '')
    bot_reply = get_bot_response(user_query)
    return jsonify({"reply": bot_reply})

# NEW: Top 5 FAQ questions endpoint
@app.route('/api/top-questions', methods=['GET'])
def top_questions():
    conn = mysql.connector.connect(
        host="localhost", user="root", password="Nikhil123457@", database="college_chatbot"
    )  # password/value as per your db setup!
    cursor = conn.cursor()
    cursor.execute("SELECT question FROM faq_table LIMIT 5;")
    rows = cursor.fetchall()
    questions = [r[0] for r in rows]
    cursor.close()
    conn.close()
    return jsonify({"questions": questions})

if __name__ == "__main__":
    app.run(debug=True)
