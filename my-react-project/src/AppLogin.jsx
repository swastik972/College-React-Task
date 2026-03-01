import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import StudentDirectory from './StudentDirectory';
import './App.css';

function App() {
  const [userEmail, setUserEmail] = useState('');

  const handleLogout = () => {
    setUserEmail('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserEmail={setUserEmail} />} />
        <Route path="/main" element={userEmail ? <StudentDirectory onLogout={handleLogout} /> : <Login setUserEmail={setUserEmail} />} />
      </Routes>
    </Router>
  );
}

export default App;
