import React from 'react';
import './MainPage.css';

function MainPage({ userEmail }) {
  return (
    <div className="main-container">
      <div className="main-card">
        <h2>Welcome to the Main Page</h2>
        <p className="user-email">Logged in as: {userEmail}</p>
      </div>
    </div>
  );
}

export default MainPage;
