// App.js
import React, { useState } from 'react';
import ChatRoom from './ChatRoom';
import Login from './Login';
import './App.css';

function App() {
  const [username, setUsername] = useState('');

  if (!username) {
    return <Login onLogin={(name) => setUsername(name)} />;
  }

  return (
    <div className="App">
      <ChatRoom username={username} />
    </div>
  );
}

export default App;
