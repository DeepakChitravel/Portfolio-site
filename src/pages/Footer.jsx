// components/Footer.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaHeart } from 'react-icons/fa';

function Footer({ profile }) {
  // Ensure profile has social links
  const socialLinks = profile?.socialLinks || {
    linkedin: profile?.linkedin || '#',
    github: profile?.github || '#',
    twitter: profile?.twitter || '#',
    portfolio: profile?.portfolio || '#'
  };

  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        {/* Footer Header */}
        <Row className="mb-5">
          <Col md={8} className="mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">Let's Connect</h2>
            <div className="bg-primary mb-4 mx-auto" style={{ width: '60px', height: '4px' }}></div>
            <p className="lead text-muted">
              Open to discussing opportunities, collaborations, or just tech in general
            </p>
          </Col>
        </Row>

        {/* Footer Content */}
        <Row className="g-4 mb-5">
          {/* Brand/Info Column */}
          <Col lg={5} md={6}>
            <div className="d-flex align-items-start mb-4">
              <div className="bg-primary text-white d-flex align-items-center justify-content-center rounded-circle me-3" 
                   style={{ width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold' }}>
                {profile?.name?.split(' ').map(n => n.charAt(0)).join('') || 'P'}
              </div>
              <div>
                <h3 className="h4 fw-bold">{profile?.name || 'Professional'}</h3>
                <p className="text-primary mb-1">{profile?.role || 'Full Stack Developer'}</p>
                <p className="text-muted">
                  {profile?.tagline || 'Building digital experiences with code'}
                </p>
              </div>
            </div>
          </Col>

          {/* Contact Info Column */}
          <Col lg={7} md={6}>
            <Row className="g-3">
              <Col md={6}>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 text-primary rounded p-2 me-3">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <small className="text-uppercase text-muted">Email</small>
                    <a href={`mailto:${profile?.email}`} className="d-block text-white text-decoration-none">
                      {profile?.email || 'contact@example.com'}
                    </a>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 text-primary rounded p-2 me-3">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <small className="text-uppercase text-muted">Location</small>
                    <div className="text-white">
                      {profile?.location || 'Remote'}
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 text-primary rounded p-2 me-3">
                    <FaBriefcase size={20} />
                  </div>
                  <div>
                    <small className="text-uppercase text-muted">Status</small>
                    <div className="text-success d-flex align-items-center">
                      <span className="bg-success rounded-circle me-2" style={{ width: '8px', height: '8px' }}></span>
                      Open to Opportunities
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Social Links & Copyright */}
        <Row className="border-top border-secondary pt-4">
          <Col md={6}>
            <div className="d-flex gap-3">
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                 className="text-white text-decoration-none">
                <FaLinkedin size={24} />
              </a>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" 
                 className="text-white text-decoration-none">
                <FaGithub size={24} />
              </a>
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" 
                   className="text-white text-decoration-none">
                  <FaTwitter size={24} />
                </a>
              )}
              {socialLinks.portfolio && (
                <a href={socialLinks.portfolio} target="_blank" rel="noopener noreferrer" 
                   className="text-white text-decoration-none">
                  <FaGlobe size={24} />
                </a>
              )}
            </div>
          </Col>
          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <p className="text-muted mb-0">
              © {new Date().getFullYear()} {profile?.name || 'Professional Portfolio'}. Made with 
              <FaHeart className="text-danger mx-1" size={14} /> 
              using React & Bootstrap
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;