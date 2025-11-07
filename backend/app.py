from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot_nlp import get_bot_response
import mysql.connector

app = Flask(__name__)
# CORS config for all methods on all routes
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response

@app.route('/api/chat', methods=['POST', 'OPTIONS'])  # Add OPTIONS method
def chat():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    data = request.get_json()
    user_query = data.get('query', '')
    bot_reply = get_bot_response(user_query)
    return jsonify({"reply": bot_reply})

@app.route('/api/top-questions', methods=['GET'])
def top_questions():
    conn = mysql.connector.connect(
        host="localhost", user="root", password="Nikhil123457@", database="college_chatbot"
    )
    cursor = conn.cursor()
    cursor.execute("SELECT question FROM faq_table LIMIT 5;")
    rows = cursor.fetchall()
    questions = [r[0] for r in rows]
    cursor.close()
    conn.close()
    return jsonify({"questions": questions})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
