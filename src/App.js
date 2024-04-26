// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import Home from './Komponenten/Home';
import Connexion from './Komponenten/connection/Connexion';
import Navigation from './Komponenten/Navigation/Navigation';
import Footer from './Komponenten/Footer/Footer';

const App = () => {
  return (
    <Router>
      <Navigation />
      <div className="content-wrap">
        <Routes>
          <Route path="/login" element={<Connexion />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} />
          {/* Redirect any other path to "/login" */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
