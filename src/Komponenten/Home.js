// Home.js
import React from 'react';
import backgroundImage from './background/background-image.png'; // Ensure this path is correct
import './Home.css'; // Ensure the CSS is being imported

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="main-content text-center bg-light p-5 rounded shadow">
          <h4 className="display-4">Welcome to Mein Notizbuch!</h4>
          <p className="lead">Mach deine besten Notizen.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
