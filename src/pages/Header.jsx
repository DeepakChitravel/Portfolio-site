import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Navbar, 
  Nav, 
  Button,
  Offcanvas 
} from 'react-bootstrap';
import { 
  FaEnvelope, 
  FaUser, 
  FaHome, 
  FaCode, 
  FaGraduationCap, 
  FaBriefcase,
  FaCertificate,
  FaProjectDiagram,
  FaPhoneAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Header = ({ profile }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  if (!profile) return null;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: <FaHome className="me-2" />, href: '#hero' },
    { id: 'skills', label: 'Skills', icon: <FaCode className="me-2" />, href: '#skills' },
    { id: 'education', label: 'Education', icon: <FaGraduationCap className="me-2" />, href: '#education' },
    { id: 'experience', label: 'Experience', icon: <FaBriefcase className="me-2" />, href: '#experience' },
    { id: 'projects', label: 'Projects', icon: <FaProjectDiagram className="me-2" />, href: '#projects' },
    { id: 'certifications', label: 'Certifications', icon: <FaCertificate className="me-2" />, href: '#certifications' },
    { id: 'contact', label: 'Contact', icon: <FaPhoneAlt className="me-2" />, href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setShowOffcanvas(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <Navbar 
        expand="lg" 
        fixed="top" 
        className={`py-2 py-lg-3 ${scrolled ? 'bg-white shadow-sm' : 'bg-white'}`}
        style={{ transition: 'all 0.3s ease' }}
      >
        <Container fluid="lg">
          {/* Brand/Logo */}
          <Navbar.Brand 
            href="#hero" 
            className="d-flex align-items-center text-decoration-none me-0 me-lg-4"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
          >
            <div className="bg-primary text-white d-flex align-items-center justify-content-center rounded-circle me-3"
                 style={{ width: '42px', height: '42px' }}>
              <FaUser size={18} />
            </div>
            <div className="d-none d-md-block">
              <span className="h5 mb-0 fw-bold text-dark">{profile.name.split(' ')[0]}</span>
              <span className="text-muted small ms-2">| {profile.role}</span>
            </div>
          </Navbar.Brand>

          {/* Desktop Navigation - Hidden on mobile */}
          <Nav className="d-none d-lg-flex align-items-center ms-auto">
            {navItems.map((item) => (
              <Nav.Link
                key={item.id}
                href={item.href}
                className="mx-2 px-3 py-2 text-dark fw-medium position-relative"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </Nav.Link>
            ))}
            
            {/* Desktop Contact Button */}
            <Button
              href={`mailto:${profile.email}`}
              variant="primary"
              className="ms-3 d-flex align-items-center gap-2 px-4 py-2"
            >
              <FaEnvelope />
              <span className="d-none d-xl-inline">Contact</span>
            </Button>
          </Nav>

          {/* Mobile Toggle Button */}
          <Button
            variant="outline-primary"
            className="d-lg-none ms-auto"
            onClick={() => setShowOffcanvas(true)}
            style={{ width: '40px', height: '40px', padding: '0' }}
          >
            <FaBars size={20} />
          </Button>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas 
        show={showOffcanvas} 
        onHide={() => setShowOffcanvas(false)}
        placement="end"
        className="border-0"
        style={{ width: '300px' }}
      >
        <Offcanvas.Header className="border-bottom py-3">
          <div className="d-flex align-items-center w-100">
            <div className="bg-primary text-white d-flex align-items-center justify-content-center rounded-circle me-3"
                 style={{ width: '48px', height: '48px' }}>
              <FaUser size={20} />
            </div>
            <div>
              <Offcanvas.Title className="fw-bold mb-0">{profile.name}</Offcanvas.Title>
              <p className="text-muted small mb-0">{profile.role}</p>
            </div>
            <Button 
              variant="link" 
              className="ms-auto p-0"
              onClick={() => setShowOffcanvas(false)}
              style={{ width: '32px', height: '32px' }}
            >
              <FaTimes size={20} className="text-dark" />
            </Button>
          </div>
        </Offcanvas.Header>
        
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column">
            {navItems.map((item) => (
              <Nav.Link
                key={item.id}
                href={item.href}
                className="py-3 px-4 border-bottom text-dark fw-medium d-flex align-items-center"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.icon}
                {item.label}
              </Nav.Link>
            ))}
            
            {/* Mobile Contact Button */}
            <div className="p-4 mt-auto">
              <Button
                href={`mailto:${profile.email}`}
                variant="primary"
                size="lg"
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-3"
              >
                <FaEnvelope />
                Send Email
              </Button>
              
              {/* Mobile Contact Info */}
              <div className="mt-4 pt-3 border-top">
                <p className="text-muted small mb-2">Email</p>
                <a 
                  href={`mailto:${profile.email}`}
                  className="text-primary text-decoration-none"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;