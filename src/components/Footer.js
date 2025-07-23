import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p className="developer-name">Karan Veer Thakur</p>
        <div className="footer-links">
          <a 
            href="https://github.com/karanveerthakur1122" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
          <a 
            href="https://karanveerthakur.com.np" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Portfolio
          </a>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
