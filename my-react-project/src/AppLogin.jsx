import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './components/MainPage';
import './App.css';

function App() {
  const [userEmail, setUserEmail] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserEmail={setUserEmail} />} />
        <Route path="/main" element={<MainPage userEmail={userEmail} />} />
      </Routes>
    </Router>
  );
}

export default App;
