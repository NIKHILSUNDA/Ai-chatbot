import mysql.connector

def get_db_connection():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',          # apna MySQL user daalein
        password='Nikhil123457@',          # apna MySQL password daalein
        database='college_chatbot'
    )
    return conn
