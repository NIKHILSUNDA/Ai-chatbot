import React from 'react';

const MessageBubble = ({ sender, message }) => (
  <div style={{
    margin: "7px 0",
    textAlign: sender === "You" ? "right" : "left"
  }}>
    <div style={{
      display: 'inline-block',
      background: sender === "You" ? "#B3E5FC" : "#FFFDE7",
      borderRadius: 18,
      padding: "9px 17px",
      color: sender === "You" ? "#1976D2" : "#333",
      fontWeight: 500,
      boxShadow: '0 1px 4px #0001',
      maxWidth: 290
    }}>
      <b>{sender === "You" ? "" : sender + ": "}</b>{message}
    </div>
  </div>
);

export default MessageBubble;
