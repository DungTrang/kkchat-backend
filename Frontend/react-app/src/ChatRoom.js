// ChatRoom.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './ChatRoom.css';

const socket = io('http://localhost:3000');

function ChatRoom({ username }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const fullMessage = `${username}: ${message}`;
      socket.emit('sendMessage', fullMessage);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <h1>KK Chat - Gửi Tin Nhắn</h1>
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index} className="message">{msg}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nhập tin nhắn..."
      />
      <button onClick={sendMessage}>Gửi</button>
    </div>
  );
}

export default ChatRoom;
