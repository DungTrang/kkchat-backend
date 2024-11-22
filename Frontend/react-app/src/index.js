import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChatRoom() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Load lịch sử tin nhắn từ localStorage khi component được mount
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages'));
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  // Lưu lịch sử tin nhắn vào localStorage mỗi khi tin nhắn thay đổi
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleLogin = () => {
    // Giả lập quá trình đăng nhập, bạn có thể thay thế bằng việc kiểm tra thực tế
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Tên đăng nhập hoặc mật khẩu không chính xác!');
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = { user: username, text: message, time: new Date().toLocaleTimeString() };
      setMessages([...messages, newMessage]);
      setMessage('');
      // Thông báo khi có tin nhắn mới
      const chatMessagesDiv = document.getElementById('chat-messages');
      if (chatMessagesDiv) {
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
      }
    }
  };

  return (
    <div className="container mt-5">
      {!isLoggedIn ? (
        <div className="card">
          <div className="card-header text-center">
            <h3>Đăng Nhập KK Chat</h3>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Tên đăng nhập" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <input 
                type="password" 
                className="form-control" 
                placeholder="Mật khẩu" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleLogin}>Đăng Nhập</button>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header text-center">
            <h3>KK Chat - Gửi Tin Nhắn</h3>
          </div>
          <div className="card-body">
            <div id="chat-messages" className="mb-3" style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <strong>{msg.user}:</strong> {msg.text} <span className="text-muted" style={{ fontSize: '0.8em' }}>({msg.time})</span>
                </div>
              ))}
            </div>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Nhập tin nhắn..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleSendMessage}>Gửi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;

/* ChatRoom.css */

/* Bong bong tin nhắn */
.message-bubble {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 5px;
  max-width: 60%;
}

.message-bubble.user {
  background-color: #007bff;
  color: #fff;
  align-self: flex-end;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .message-bubble {
    max-width: 80%;
  }
}