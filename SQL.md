CREATE DATABASE college_chatbot;
USE college_chatbot;
-- Table 1: FAQ Table
CREATE TABLE faq_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL
);

-- Table 2: Chat History
CREATE TABLE chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_query TEXT NOT NULL,
    bot_reply TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO faq_table (question, answer) VALUES
('What is the admission process?', 'You can apply online through the Chandigarh University admission portal.'),
('What are the MCA fees?', 'The MCA program costs ₹90,000 per year.'),
('Where is the university located?', 'Chandigarh University is located in Gharuan, Mohali, Punjab.'),
('What is the contact email?', 'You can reach us at admissions@cumail.in.'),
('What are the hostel facilities?', 'CU provides separate hostels for boys and girls with Wi-Fi, gym, mess, and security.'),
('Does CU offer placements?', 'Yes, CU has tie-ups with more than 900 companies including Amazon, Microsoft, and IBM.'),
('How to apply for scholarships?', 'You can apply through CU-Scholarship portal. Merit-based and need-based scholarships are available.'),
('What is the minimum attendance requirement?', 'You need at least 75% attendance in each subject.'),
('What is the grading system?', 'The grading follows a 10-point CGPA system as per university norms.'),
('What is the official website?', 'Visit www.cuchd.in for all official updates.'),
('When do semester exams start?', 'Usually semester exams begin in December and June.'),
('Is there a transport facility?', 'Yes, CU provides bus service for students from major nearby cities.'),
('Who can I contact for hostel issues?', 'Contact the hostel warden or the student support desk at hostel.cu@cumail.in.'),
('Does CU have international programs?', 'Yes, CU offers study abroad programs and global exchange opportunities.'),
('How to get the bonafide certificate?', 'You can apply for a bonafide certificate from the Student Zone portal.');




