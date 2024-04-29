// Home.js
import React from 'react';
import backgroundImage from './background/background-image.webp'; // Ensure the path to your background image is correct
import './Home.css'; // Import the custom CSS for additional styling

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="main-content text-center bg-light p-5 rounded shadow">
          <h1 className="display-4">Welcome to Mein Notizbuch!</h1>
          <p className="lead">Macht deine besten Notizen hier.</p>
          <button className="btn btn-primary mt-4">Create New Note</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
