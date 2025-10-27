def get_all_faqs(conn):
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM faq_table")
    faqs = cursor.fetchall()
    cursor.close()
    return faqs

def add_faq(conn, question, answer):
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO faq_table (question, answer) VALUES (%s, %s)",
        (question, answer)
    )
    conn.commit()
    cursor.close()
