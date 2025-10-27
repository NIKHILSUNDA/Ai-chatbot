import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import { FaRobot } from 'react-icons/fa';

const initialMsgs = [
  { sender: 'bot', message: 'Hi there!' },
  { sender: 'bot', message: 'Welcome to Chandigarh University.' },
  { sender: 'bot', message: 'How may I assist you today?' }
];


// Flask Backend Integration function
async function sendMessageToBot(userQuery) {
  try {
    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: userQuery })
    });
    const data = await res.json();
    return data.reply;
  } catch (error) {
    console.error('Backend connection error:', error);
    return "Sorry, I'm having trouble connecting to the server. Please try again later.";
  }
}

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(initialMsgs);
  const [preQueries, setPreQueries] = useState([
    "Loading...", "Loading...", "Loading...", "Loading...", "Loading..."
  ]);

  // Animate logo by rotating
  const [logoAngle, setLogoAngle] = useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setLogoAngle(angle => angle + 10), 80);
    return () => clearInterval(interval);
  }, []);

  // Fetch top-questions from backend on load
  React.useEffect(() => {
    fetch("http://localhost:5000/api/top-questions")
      .then(res => res.json())
      .then(data => {
        if (data.questions && data.questions.length > 0) setPreQueries(data.questions);
      })
      .catch(e => setPreQueries([
        "Failed to load questions", "", "", "", ""
      ]));
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { sender: 'You', message: input }]);
    const userMsg = input;
    setInput('');
    const botReply = await sendMessageToBot(userMsg);
    setMessages(msgs => [...msgs, { sender: 'CU Bot', message: botReply }]);
  };

  const handlePre = async (query) => {
    setMessages(msgs => [...msgs, { sender: 'You', message: query }]);
    const botReply = await sendMessageToBot(query);
    setMessages(msgs => [...msgs, { sender: 'CU Bot', message: botReply }]);
  };

  return (
    <div style={{
      maxWidth: 420,
      margin: "86px auto 24px auto",
      background: "rgba(255,255,255,0.96)",
      borderRadius: 20,
      boxShadow: "0 6px 24px #7774",
      padding: "1.2rem 1rem 1rem 1rem",
      border: "1px solid #FFD600",
      position: "relative",
      overflow: "visible"
    }}>
      {/* Animated Bot Logo and Name */}
      <div style={{display: 'flex', alignItems:'center', justifyContent:'center', marginBottom:14}}>
        <FaRobot style={{
          fontSize: 38,
          marginRight: 12,
          color: "#FFD600",
          transform: `rotate(${logoAngle}deg)`,
          transition: 'transform 0.2s'
        }} />
        <span style={{fontSize: 24, fontWeight:'bold', color:'#555'}}>CU Help Bot</span>
      </div>
      {/* Chat Section */}
      <div style={{minHeight: 220, marginBottom: 10, paddingBottom:10, maxHeight: 350, overflowY: 'auto'}}>
        {messages.map((msg, idx) =>
          <MessageBubble key={idx} sender={msg.sender} message={msg.message} />
        )}
      </div>
      {/* Predefined buttons */}
      <div style={{ marginBottom: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {preQueries.map((q, i) =>
          <button key={i}
            onClick={() => q && handlePre(q)}
            style={{
              background: "#FFFDE7",
              color: "#333",
              border: "2px solid #FFD600",
              borderRadius: 16,
              padding: "8px 14px",
              fontSize: "15px",
              cursor: q ? "pointer" : "not-allowed",
              opacity: q ? 1 : 0.6
            }}
          >{q}</button>
        )}
      </div>
      {/* Message Input */}
      <div style={{ display: "flex" }}>
        <input
          style={{
            flex: 1, padding: 10, borderRadius: 15, border: "1px solid #e0e0e0"
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message..."
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
        <button onClick={handleSend} style={{
          marginLeft: 8, padding: "8px 16px", borderRadius: 15, background: "#FFD600", border: "none", fontWeight: 500, cursor: 'pointer'
        }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
