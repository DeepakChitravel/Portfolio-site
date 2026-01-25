import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const TechnicalSkills = ({ profile }) => {
  if (!profile) return null;

  return (
    <section id="skills" className="py-5 bg-light">
      <Container>
        {/* Section Header */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">Technical Skills</h2>
            <p className="lead text-muted mb-4">
              Technologies and tools I work with
            </p>
            <div className="bg-primary mx-auto mb-4" 
                 style={{ width: '60px', height: '3px' }}></div>
          </Col>
        </Row>

        {/* Skills Display */}
        {profile.skills && profile.skills.length > 0 ? (
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {profile.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="d-flex align-items-center px-4 py-3 bg-white rounded-pill border shadow-sm hover-lift transition-all"
                    style={{
                      minWidth: '140px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                    }}
                  >
                    <span className="fw-medium text-dark">{skill}</span>
                    <span className="badge bg-primary ms-2 px-2 py-1">
                      {skill.charAt(0)}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Skills Count */}
              <div className="text-center mt-5">
                <div className="bg-white d-inline-block px-4 py-2 rounded-pill border shadow-sm">
                  <span className="text-muted me-2">Total Skills:</span>
                  <span className="fw-bold text-primary">{profile.skills.length}</span>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className="text-center py-5">
              <div className="bg-white p-5 rounded-4 border shadow-sm">
                <div className="text-muted mb-3">
                  <i className="bi bi-tools fs-1"></i>
                </div>
                <h4 className="fw-bold mb-2">No skills available</h4>
                <p className="text-muted mb-0">
                  Technical skills will be added soon
                </p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default TechnicalSkills;