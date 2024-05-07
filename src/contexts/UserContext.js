import React, { createContext, useState } from 'react';
import axios from 'axios'; // Import axios

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  const hinzufuegenNotiz = async (note) => {
    try {
      const response = await axios.post('http://localhost:3002/api/notes', note); // Using axios for a POST request
      return response.data;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    hinzufuegenNotiz,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
