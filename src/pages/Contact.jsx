// components/Contact.jsx
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaPaperPlane, FaDownload } from 'react-icons/fa';

function Contact({ profile }) {
  return (
    <section id="contact" className="py-5 bg-light">
      <Container>
        <Row className="mb-5">
          <Col md={8} className="mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">Ready to Connect?</h2>
            <div className="bg-primary mb-4 mx-auto" style={{ width: '60px', height: '4px' }}></div>
            <p className="lead text-muted">
              I'm currently available for full-time opportunities and freelance projects.
            </p>
          </Col>
        </Row>

        <Row className="g-4 justify-content-center mb-5">
          {/* Contact Info Cards */}
          <Col lg={4} md={6}>
            <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
              <Card.Body className="text-center p-4">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                     style={{ width: '60px', height: '60px' }}>
                  <FaEnvelope size={24} />
                </div>
                <Card.Title className="h5 mb-3">Email</Card.Title>
                <a href={`mailto:${profile?.email}`} className="text-decoration-none">
                  <h6 className="text-primary">{profile?.email || 'contact@example.com'}</h6>
                </a>
                <p className="text-muted small mt-2">
                  Drop me a line anytime. I typically respond within 24 hours.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
              <Card.Body className="text-center p-4">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                     style={{ width: '60px', height: '60px' }}>
                  <FaMapMarkerAlt size={24} />
                </div>
                <Card.Title className="h5 mb-3">Location</Card.Title>
                <h6 className="text-dark">{profile?.location || 'Remote / Open to Relocation'}</h6>
                <p className="text-muted small mt-2">
                  Available for remote work or relocation to exciting opportunities.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
              <Card.Body className="text-center p-4">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                     style={{ width: '60px', height: '60px' }}>
                  <FaBriefcase size={24} />
                </div>
                <Card.Title className="h5 mb-3">Status</Card.Title>
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <span className="bg-success rounded-circle me-2" style={{ width: '10px', height: '10px' }}></span>
                  <h6 className="text-success mb-0">Open to Opportunities</h6>
                </div>
                <p className="text-muted small">
                  Seeking full-time roles, freelance projects, and meaningful collaborations.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action Buttons */}
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <Button 
                href={`mailto:${profile?.email}`} 
                variant="primary" 
                size="lg"
                className="px-4 py-3 d-flex align-items-center justify-content-center gap-2"
              >
                <FaPaperPlane />
                Send Email
              </Button>
              
              <Button 
                href={profile?.resume ? `http://localhost:5000${profile.resume}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-primary" 
                size="lg"
                className="px-4 py-3 d-flex align-items-center justify-content-center gap-2"
              >
                <FaDownload />
                Download Resume
              </Button>
            </div>
            
            <p className="text-muted mt-4 small">
              Feel free to reach out for project discussions, job opportunities, or just to say hello!
            </p>
          </Col>
        </Row>

        {/* Quick Response Note */}
        <Row className="mt-5">
          <Col md={10} className="mx-auto">
            <div className="bg-primary bg-opacity-10 border-start border-primary border-4 p-4 rounded">
              <Row className="align-items-center">
                <Col md={9}>
                  <h5 className="text-dark mb-2">Quick Response Guarantee</h5>
                  <p className="text-muted mb-0">
                    I value every message and ensure to respond within 24 hours. 
                    Whether it's about a project, collaboration, or just tech talk, I'd love to connect!
                  </p>
                </Col>
                <Col md={3} className="text-md-end mt-3 mt-md-0">
                  <span className="badge bg-primary fs-6 px-3 py-2">
                    ⚡ 24h Response
                  </span>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;