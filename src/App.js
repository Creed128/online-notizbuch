import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import Home from './Komponenten/Home';
import Connexion from './Komponenten/connection/Connexion';
import Navigation from './Komponenten/Navigation/Navigation';
import Footer from './Komponenten/Footer/Footer';
import Register from './Komponenten/connection/Register'; // Assuming you have a Register component

const App = () => {
  const { user } = useContext(UserContext);

  // Function to handle private routes
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navigation />
      <div className="content-wrap" style={{ paddingBottom: '4rem' }}> {/* Padding to avoid footer overlap */}
        <Routes>
          <Route path="/login" element={<Connexion />} />
          <Route path="/register" element={<Register />} /> {/* Registration route */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
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
