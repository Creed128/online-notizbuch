import React from 'react';
import { createRoot } from 'react-dom/client'; // Importez createRoot
import App from './App';
import { UserProvider } from './contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const container = document.getElementById('root'); // Récupérez l'élément du DOM
const root = createRoot(container); // Créez une racine
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
