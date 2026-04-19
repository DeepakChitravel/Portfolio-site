import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import {
  FaFileDownload,
  FaEnvelope,
  FaChevronDown,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaBriefcase,
  FaMapMarkerAlt,
  FaUserTie,
  FaStar,
  FaRocket
} from 'react-icons/fa';

const HeroSection = ({ profile }) => {
  if (!profile) return null;

  const socialLinks = profile.socialLinks || {
    linkedin: 'https://www.linkedin.com/in/deepak-chitravel/',
    github: 'https://github.com/deepakchitravel',
    email: 'mailto:deepakchitravel@gmail.com'
  };

  return (
    <section
      id="hero"
      className="hero-section position-relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        minHeight: { xs: 'auto', md: '100vh' },
        paddingBottom: { xs: '40px', md: '0' }
      }}
    >
      {/* Animated Gradient Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.7) 25%, rgba(240, 147, 251, 0.6) 50%, rgba(245, 87, 108, 0.5) 75%, rgba(79, 172, 254, 0.4) 100%)',
          animation: 'gradientShift 15s ease infinite',
          backgroundSize: '400% 400%'
        }}></div>

      {/* Pattern Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 2px, transparent 0)`,
          backgroundSize: '30px 30px',
          opacity: 0.3
        }}></div>

      <Container className="position-relative z-2">
        <Row className="align-items-center justify-content-center min-vh-lg-100 py-3 py-md-5">

          {/* Right Column - Profile Image (Moves to top on mobile) */}
          <Col
            lg={6}
            md={6}
            className="order-1 order-lg-2 text-center mb-3 mb-lg-0"
          >
            <div className="position-relative mx-auto" style={{ maxWidth: '100%' }}>
              {/* Animated Glow Effect */}
              <div className="position-absolute top-50 start-50 translate-middle rounded-circle d-none d-md-block"
                style={{
                  width: '450px',
                  height: '450px',
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
                  filter: 'blur(70px)',
                  opacity: '0.4',
                  animation: 'glowPulse 8s ease-in-out infinite',
                  backgroundSize: '300% 300%'
                }}>
              </div>

              {/* Profile Image Container */}
              <div className="profile-img-container position-relative rounded-circle overflow-hidden mx-auto shadow-lg"
                style={{
                  border: '4px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(5px)'
                }}>
                <img
                  src={profile.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80"}
                  alt={profile.name}
                  className="w-100 h-100"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                  }}
                  onMouseOver={(e) => {
                    if (window.innerWidth > 768) {
                      e.currentTarget.style.transform = 'scale(1.1) rotate(2deg)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0)';
                  }}
                />
              </div>

              {/* Floating Elements - Hidden on mobile */}
              <div className="position-absolute top-0 end-0 rounded-circle shadow d-none d-lg-flex align-items-center justify-content-center"
                style={{
                  width: '70px',
                  height: '70px',
                  transform: 'translate(30%, -30%)',
                  background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
                  animation: 'float 6s ease-in-out infinite',
                  boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4)'
                }}>
                <span className="text-white fw-bold">EXP</span>
              </div>

              <div className="position-absolute bottom-0 start-0 rounded-circle shadow d-none d-lg-flex align-items-center justify-content-center"
                style={{
                  width: '60px',
                  height: '60px',
                  transform: 'translate(-30%, 30%)',
                  background: 'linear-gradient(45deg, #4ecdc4, #45b7d1)',
                  animation: 'float 4s ease-in-out infinite 1s',
                  boxShadow: '0 10px 30px rgba(78, 205, 196, 0.4)'
                }}>
                <FaStar className="text-white" />
              </div>
            </div>
          </Col>

          {/* Left Column - Text Content */}
          <Col lg={6} md={6} className="order-2 order-lg-1 text-center text-md-start">
            <div className="mb-3 mb-md-4">
              <Badge
                pill
                bg="white"
                className="text-dark px-3 py-2 shadow-lg fw-medium d-inline-flex align-items-center"
                style={{
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontSize: '0.8rem'
                }}
              >
                <FaRocket className="me-2 text-primary" size={14} />
                <span className="bg-success rounded-circle me-2"
                  style={{ width: '8px', height: '8px' }}></span>
                Open to Opportunities
              </Badge>
            </div>

            <h1 className="fw-bold mb-2 mb-md-3 text-white"
              style={{ 
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                fontSize: 'clamp(1.75rem, 6vw, 3rem)',
                lineHeight: '1.2'
              }}>
              Hello, I'm <br className="d-block d-md-none" />
              <span className="text-warning" style={{ fontWeight: '700' }}>{profile.name}</span>
            </h1>

            <h2 className="fw-light mb-3 mb-md-4 text-white"
              style={{ 
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                fontSize: 'clamp(1.1rem, 4vw, 1.75rem)',
                lineHeight: '1.4'
              }}>
              {profile.role}
              {profile.experience && (
                <span className="ms-2 ms-md-3 fs-6 fw-normal text-light opacity-90 d-block d-md-inline-block mt-1 mt-md-0">
                  <FaBriefcase className="me-1" size={12} />
                  {profile.experience}+ years
                </span>
              )}
            </h2>

            <p className="mb-4 mb-md-5 text-white"
              style={{
                lineHeight: '1.6',
                fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)',
                textShadow: '0 1px 4px rgba(0,0,0,0.2)',
                opacity: '0.95',
                maxWidth: '100%',
                letterSpacing: '0.3px'
              }}>
              {profile.shortIntro || "Passionate full-stack developer specializing in building scalable web applications with modern technologies. Focused on creating efficient, user-centric solutions that solve real-world problems."}
            </p>

            {/* Location & Availability */}
            {profile.location && (
              <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-2 gap-sm-3 mb-4 text-white"
                style={{ opacity: '0.95' }}>
                <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
                  <FaMapMarkerAlt className="me-2 text-warning" size={14} />
                  <span className="fw-medium" style={{ fontSize: '0.85rem' }}>{profile.location}</span>
                </div>
                <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
                  <FaUserTie className="me-2 text-warning" size={14} />
                  <span className="fw-medium" style={{ fontSize: '0.85rem' }}>Available for Full-time & Remote</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 gap-md-4 mb-4 mb-md-5 justify-content-center justify-content-md-start">
              <Button
                href={profile.resume ? `https://portfolio-backend-oiq9.onrender.com${profile.resume}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
                variant="warning"
                size="lg"
                className="px-4 py-2 d-flex align-items-center justify-content-center fw-bold shadow-lg"
                style={{
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                  fontSize: 'clamp(0.85rem, 3vw, 1rem)',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 193, 7, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                }}
              >
                <FaFileDownload className="me-2" size={14} />
                View Resume
              </Button>

              <Button
                onClick={() => {
                  const section = document.querySelector('#contact');
                  if (section) {
                    section.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                variant="outline-light"
                size="lg"
                className="px-4 py-2 d-flex align-items-center justify-content-center fw-bold border-2"
                style={{
                  borderRadius: '50px',
                  backdropFilter: 'blur(10px)',
                  fontSize: 'clamp(0.85rem, 3vw, 1rem)',
                  whiteSpace: 'nowrap'
                }}
              >
                <FaEnvelope className="me-2" size={14} />
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div className="d-flex gap-3 gap-md-4 justify-content-center justify-content-md-start">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(45deg, #0077b5, #00a0dc)',
                  boxShadow: '0 4px 15px rgba(0, 119, 181, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = 'translateY(-5px) rotate(5deg)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 119, 181, 0.5)';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) rotate(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 119, 181, 0.3)';
                }}
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(45deg, #333, #6e5494)',
                  boxShadow: '0 4px 15px rgba(51, 51, 51, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = 'translateY(-5px) rotate(-5deg)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(51, 51, 51, 0.5)';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) rotate(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(51, 51, 51, 0.3)';
                }}
              >
                <FaGithub size={18} />
              </a>

              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(45deg, #1da1f2, #00acee)',
                    boxShadow: '0 4px 15px rgba(29, 161, 242, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    if (window.innerWidth > 768) {
                      e.currentTarget.style.transform = 'translateY(-5px) rotate(5deg)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(29, 161, 242, 0.5)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) rotate(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(29, 161, 242, 0.3)';
                  }}
                >
                  <FaTwitter size={18} />
                </a>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Scroll Indicator */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 mb-md-4 z-2 d-none d-md-block">
        <button
          onClick={() => {
            const skillsSection = document.querySelector('#skills');
            if (skillsSection) {
              skillsSection.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }}
          className="btn btn-link text-decoration-none text-white d-flex flex-column align-items-center"
          style={{
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',
            animation: 'pulse 2s infinite'
          }}
        >
          <span className="mb-2 small fw-medium"
            style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>
            Explore More
          </span>
          <FaChevronDown
            style={{
              fontSize: '1.5rem'
            }}
          />
        </button>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes glowPulse {
          0%, 100% { 
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        /* Hero section padding fix */
        .hero-section {
          padding-top: 80px;
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding-top: 60px;
          }
          
          .min-vh-lg-100 {
            min-height: auto;
          }
        }
        
        @media (min-width: 768px) and (max-width: 992px) {
          .min-vh-lg-100 {
            min-height: 100vh;
          }
        }
        
        /* Smooth transitions */
        .rounded-circle {
          transition: all 0.3s ease;
        }
        
        /* Hover effects only on desktop */
        @media (min-width: 768px) {
          .btn, .rounded-circle {
            transition: all 0.3s ease;
          }
        }
        
        /* Responsive profile image container */
        .profile-img-container {
          width: 220px;
          height: 220px;
        }
        
        @media (min-width: 576px) {
          .profile-img-container {
            width: 260px;
            height: 260px;
          }
        }
        
        @media (min-width: 768px) {
          .profile-img-container {
            width: 340px;
            height: 340px;
          }
        }
        
        @media (min-width: 992px) {
          .profile-img-container {
            width: 380px;
            height: 380px;
          }
        }
        
        /* Better text contrast for mobile */
        @media (max-width: 768px) {
          .text-white {
            text-shadow: 0 1px 3px rgba(0,0,0,0.3);
          }
        }
      `}
      </style>
    </section>
  );
};

export default HeroSection;