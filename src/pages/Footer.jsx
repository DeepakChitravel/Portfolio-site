import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* HEADER */}
        <div className="footer-header">
          <h2>Let’s Build Something Great 🚀</h2>
          <p>
            Open to full-time roles, freelance projects, and collaborations
          </p>
        </div>

        {/* MAIN */}
        <div className="footer-main">

          {/* LEFT */}
          <div className="footer-left">
            <div className="footer-logo">DC</div>

            <div>
              <h3>Deepak Chitravel</h3>
              <span>Full Stack Developer</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="footer-right">
            <div>
              <FaEnvelope /> deepakchitravel@gmail.com
            </div>
            <div>
              <FaMapMarkerAlt /> Tamil Nadu, India
            </div>
          </div>

        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/deepak-chitravel/" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/deepakchitravel" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </div>

        {/* DIVIDER */}
        <div className="footer-divider"></div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Deepak Chitravel</p>
          <p>
            Built with <FaHeart className="heart" /> using React
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;