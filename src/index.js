// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
<<<<<<< HEAD
import { UserProvider } from './contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = createRoot(document.getElementById('root'));
root.render(
=======
import { UserProvider } from './contexts/UserContext';  // Import the named export
// In index.js
ReactDOM.render(
>>>>>>> design
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
