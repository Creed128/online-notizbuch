import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import Home from './Komponenten/Home';
import Connexion from './Komponenten/connection/Connexion';
import Navigation from './Komponenten/Navigation/Navigation';
import Footer from './Komponenten/Footer/Footer';
import Register from './Komponenten/connection/Register';
import NeueNotizFormular from './Komponenten/NotizFormular/NeueNotizFormular';
import NotizListe from './Komponenten/NotizListe/NotizListe';
import NotizDetail from './NotizDetail/NotizDetail'; // Assurez-vous que le chemin est correct

const App = () => {
  const { user } = useContext(UserContext);

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/home" />;
  };

  return (
    <Router>
      <Navigation />
      <div className="content-wrap" style={{ paddingBottom: '4rem' }}>
        <Routes>
          <Route path="/login" element={<Connexion />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/neue-notiz" element={<PrivateRoute><NeueNotizFormular /></PrivateRoute>} />
          <Route path="/notizen" element={<PrivateRoute><NotizListe /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
