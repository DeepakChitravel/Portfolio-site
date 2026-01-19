import React, { useState } from 'react';

const Header = ({ profile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!profile) return null;

  return (
    <header className="sticky-top bg-white border-bottom">
      <div className="container">
        <nav className="navbar navbar-expand-lg px-0 py-3">
          {/* Logo */}
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
                 style={{width: '36px', height: '36px'}}>
              <span className="fw-bold">{profile.name.charAt(0)}</span>
            </div>
            <div className="ms-3">
              <div className="fw-bold">{profile.name.split(' ')[0]}</div>
              <div className="text-muted small">{profile.role}</div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler ms-auto"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <div className="navbar-nav ms-auto align-items-lg-center">
              <a 
                className="nav-link px-3" 
                href="#skills"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </a>
              <a 
                className="nav-link px-3" 
                href="#education"
                onClick={() => setIsMenuOpen(false)}
              >
                Education
              </a>
              <a 
                className="nav-link px-3" 
                href="#experience"
                onClick={() => setIsMenuOpen(false)}
              >
                Experience
              </a>
              <a 
                className="nav-link px-3" 
                href="#certifications"
                onClick={() => setIsMenuOpen(false)}
              >
                Certifications
              </a>
              <div className="nav-item ms-lg-3 mt-3 mt-lg-0">
                <a 
                  href={`mailto:${profile.email}`} 
                  className="btn btn-dark btn-sm"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;