import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
  };

  const hinzufuegenNotiz = useCallback(async (note) => {
    if (!user) {
      throw new Error("Not logged in");
    }
    try {
      const response = await axios.post('http://localhost:3002/api/notes', {...note, owner: user.username});
      return response.data;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  }, [user]);

  const value = {
    user,
    setUser,
    logout,
    hinzufuegenNotiz,  // Add the function to the context
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
