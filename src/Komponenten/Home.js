// Home.js
import React from 'react';
import backgroundImage from './background/background-image.webp'; // Ensure this path is correct
import './Home.css'; // Ensure the CSS is being imported


const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Ensure no additional Navigation is included here, as it should be handled by App.js */}
      <div className="main-content">
        <h1>Welcome to Mein Notizbuch!</h1>
        <p> Macht deine beste Notizen .</p>
        {/* Rest of your content */}
      </div>
      {/* Ensure no Footer is included here, as it should be handled by App.js */}
    </div>
  );
};

export default Home;
