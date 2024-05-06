import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <p className="mb-0">© 2024 Mein Notizbuch</p>
            <p className="mb-0">
              <Link to="/terms-of-service" className="footer-link">Terms of Service</Link> | <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
