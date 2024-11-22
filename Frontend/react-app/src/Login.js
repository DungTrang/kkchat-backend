// Login.js
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim() !== '') {
      onLogin(username);
    }
  };

  return (
    <div className="App">
      <h1>KK Chat - Đăng Nhập</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nhập tên người dùng..."
      />
      <button onClick={handleLogin}>Đăng Nhập</button>
    </div>
  );
}

export default Login;
