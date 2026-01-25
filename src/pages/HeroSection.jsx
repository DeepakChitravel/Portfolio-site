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
    linkedin: '#',
    github: '#',
    twitter: '#'
  };

  return (
    <section 
      id="hero" 
      className="position-relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        minHeight: '100vh',
        paddingTop: '80px'
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
        <Row className="align-items-center min-vh-100 py-5">
          {/* Left Column - Text Content */}
          <Col lg={6} md={8} className="mb-5 mb-lg-0">
            <div className="mb-4">
              <Badge 
                pill 
                bg="white" 
                className="text-dark px-4 py-2 shadow-lg fw-medium d-inline-flex align-items-center"
                style={{ 
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              >
                <FaRocket className="me-2 text-primary" />
                <span className="bg-success rounded-circle me-2" 
                      style={{ width: '8px', height: '8px' }}></span>
                Open to Opportunities
              </Badge>
            </div>
            
            <h1 className="display-3 fw-bold mb-3 text-white"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
              Hello, I'm <span className="text-warning">{profile.name}</span>
            </h1>
            
            <h2 className="fs-1 fw-light mb-4 text-white"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
              {profile.role}
              {profile.experience && (
                <span className="ms-3 fs-5 fw-normal text-light opacity-90">
                  <FaBriefcase className="me-2" /> 
                  {profile.experience}+ years
                </span>
              )}
            </h2>
            
            <p className="lead mb-5 text-white opacity-90" 
               style={{ 
                 lineHeight: '1.8', 
                 fontSize: '1.2rem',
                 textShadow: '0 1px 4px rgba(0,0,0,0.1)'
               }}>
              {profile.shortIntro || "Passionate full-stack developer specializing in building scalable web applications with modern technologies. Focused on creating efficient, user-centric solutions that solve real-world problems."}
            </p>

            {/* Location & Availability */}
            {profile.location && (
              <div className="d-flex align-items-center mb-4 text-white opacity-90">
                <FaMapMarkerAlt className="me-3 text-warning fs-5" />
                <span className="me-5 fw-medium">{profile.location}</span>
                <FaUserTie className="me-3 text-warning fs-5" />
                <span className="fw-medium">Available for Full-time & Remote</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-4 mb-5">
              <Button
                href={profile.resume ? `http://localhost:5000${profile.resume}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
                variant="warning"
                size="lg"
                className="px-5 py-3 d-flex align-items-center fw-bold shadow-lg"
                style={{ 
                  borderRadius: '50px',
                  transition: 'all 0.3s ease'
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
                <FaFileDownload className="me-3 fs-5" />
                View Resume
              </Button>
              
              <Button
                href={`mailto:${profile.email}`}
                variant="outline-light"
                size="lg"
                className="px-5 py-3 d-flex align-items-center fw-bold border-3"
                style={{ 
                  borderRadius: '50px',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <FaEnvelope className="me-3 fs-5" />
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div className="d-flex gap-4">
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ 
                  width: '55px', 
                  height: '55px',
                  background: 'linear-gradient(45deg, #0077b5, #00a0dc)',
                  boxShadow: '0 4px 15px rgba(0, 119, 181, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px) rotate(5deg)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 119, 181, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) rotate(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 119, 181, 0.3)';
                }}
              >
                <FaLinkedin size={24} />
              </a>
              
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ 
                  width: '55px', 
                  height: '55px',
                  background: 'linear-gradient(45deg, #333, #6e5494)',
                  boxShadow: '0 4px 15px rgba(51, 51, 51, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px) rotate(-5deg)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(51, 51, 51, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) rotate(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(51, 51, 51, 0.3)';
                }}
              >
                <FaGithub size={24} />
              </a>
              
              {socialLinks.twitter && (
                <a 
                  href={socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-decoration-none text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '55px', 
                    height: '55px',
                    background: 'linear-gradient(45deg, #1da1f2, #00acee)',
                    boxShadow: '0 4px 15px rgba(29, 161, 242, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px) rotate(5deg)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(29, 161, 242, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) rotate(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(29, 161, 242, 0.3)';
                  }}
                >
                  <FaTwitter size={24} />
                </a>
              )}
            </div>
          </Col>
          
          {/* Right Column - Profile Image */}
          <Col lg={6} md={4} className="text-center">
            <div className="position-relative">
              <div className="position-relative mx-auto"
                   style={{ 
                     maxWidth: '420px',
                     maxHeight: '420px'
                   }}>
                {/* Animated Glow Effect */}
                <div className="position-absolute top-50 start-50 translate-middle rounded-circle"
                     style={{ 
                       width: '450px', 
                       height: '450px',
                       background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
                       filter: 'blur(70px)',
                       opacity: '0.4',
                       animation: 'glowPulse 8s ease-in-out infinite',
                       backgroundSize: '300% 300%'
                     }}></div>
                
                {/* Profile Image Container */}
                <div className="position-relative rounded-circle overflow-hidden mx-auto"
                     style={{ 
                       width: '380px',
                       height: '380px',
                       border: '8px solid rgba(255,255,255,0.3)',
                       boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                       background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                       backdropFilter: 'blur(5px)'
                     }}>
                  <img 
                    src={profile.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80"} 
                    alt={profile.name}
                    className="w-100 h-100"
                    style={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.8s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1) rotate(2deg)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0)';
                    }}
                  />
                </div>
                
                {/* Floating Elements */}
                <div className="position-absolute top-0 end-0 rounded-circle shadow d-none d-lg-flex align-items-center justify-content-center"
                     style={{ 
                       width: '70px', 
                       height: '70px', 
                       transform: 'translate(40%, -40%)',
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
                       transform: 'translate(-40%, 40%)',
                       background: 'linear-gradient(45deg, #4ecdc4, #45b7d1)',
                       animation: 'float 4s ease-in-out infinite 1s',
                       boxShadow: '0 10px 30px rgba(78, 205, 196, 0.4)'
                     }}>
                  <FaStar className="text-white" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Scroll Indicator */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 z-2">
        <button 
          onClick={() => {
            document.querySelector('#skills').scrollIntoView({ 
              behavior: 'smooth' 
            });
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
              fontSize: '1.8rem'
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
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-15px);}
          60% {transform: translateY(-7px);}
        }
        
        .scroll-indicator {
          animation: bounce 2s infinite;
        }
        
        @media (max-width: 768px) {
          .display-3 {
            font-size: 2.5rem;
          }
          
          .fs-1 {
            font-size: 1.5rem !important;
          }
          
          .lead {
            font-size: 1rem !important;
          }
          
          .position-relative.mx-auto {
            max-width: 300px !important;
            max-height: 300px !important;
          }
          
          .position-relative.rounded-circle {
            width: 280px !important;
            height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;