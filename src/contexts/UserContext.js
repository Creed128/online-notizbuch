// src/contexts/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Démarrez avec null pour indiquer aucun utilisateur connecté par défaut

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    setUser(null); // Réinitialise l'utilisateur à null lors de la déconnexion
  };

  const value = {
    user,
    setUser,
    logout, // Fournir la fonction de déconnexion via le contexte
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
