import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { 
  FaGraduationCap, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaBook, 
  FaAward,
  FaUniversity,
  FaSpinner
} from 'react-icons/fa';

const Education = ({ education, loading }) => {
  const calculateDuration = (startYear, endYear, current) => {
    if (current) return `${startYear} - Present`;
    return `${startYear} - ${endYear}`;
  };

  if (loading) {
    return (
      <section id="education" className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold mb-3">Education</h2>
              <p className="lead text-muted mb-4">Academic background and certifications</p>
              <div className="bg-primary mx-auto mb-4" 
                   style={{ width: '60px', height: '3px' }}></div>
            </Col>
          </Row>
          
          <Row className="justify-content-center g-4">
            {[1, 2, 3].map((i) => (
              <Col lg={8} key={i}>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="placeholder-glow">
                      <div className="placeholder col-6 mb-3" style={{ height: '25px' }}></div>
                      <div className="placeholder col-4 mb-2" style={{ height: '20px' }}></div>
                      <div className="placeholder col-8 mb-4" style={{ height: '20px' }}></div>
                      <div className="placeholder col-10" style={{ height: '60px' }}></div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    );
  }

  if (!education || education.length === 0) {
    return (
      <section id="education" className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold mb-3">Education</h2>
              <p className="lead text-muted mb-4">Academic background and certifications</p>
              <div className="bg-primary mx-auto mb-4" 
                   style={{ width: '60px', height: '3px' }}></div>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            <Col lg={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center p-5">
                  <div className="text-muted mb-4">
                    <FaGraduationCap size={60} />
                  </div>
                  <h4 className="fw-bold mb-3">No Education Listed</h4>
                  <p className="text-muted mb-0">
                    Educational background will be added soon.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section id="education" className="py-5 bg-light">
      <Container>
        {/* Section Header */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <Badge 
              bg="primary" 
              className="px-4 py-2 mb-3 rounded-pill fw-medium d-inline-flex align-items-center shadow-sm"
            >
              <FaGraduationCap className="me-2" />
              Academic Journey
            </Badge>
            <h2 className="display-5 fw-bold mb-3">Education</h2>
            <p className="lead text-muted mb-4">
              Academic background and certifications
            </p>
            <div className="bg-primary mx-auto mb-4" 
                 style={{ width: '60px', height: '3px' }}></div>
          </Col>
        </Row>

        {/* Education Timeline */}
        <Row className="justify-content-center">
          <Col lg={10}>
            {education.map((edu, index) => (
              <div 
                key={edu._id || index}
                className="position-relative mb-5"
              >
                {/* Timeline Line */}
                <div className="position-absolute top-0 start-0 h-100 d-none d-md-block">
                  <div className="border-start border-2 border-primary ms-4 h-100"></div>
                </div>

                {/* Content */}
                <Row className="g-0">
                  {/* Timeline Dot (Desktop) */}
                  <Col md={1} className="d-none d-md-block">
                    <div className="position-relative">
                      <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto"
                           style={{ 
                             width: '50px', 
                             height: '50px',
                             position: 'relative',
                             zIndex: 2
                           }}>
                        <FaUniversity className="text-white" size={20} />
                      </div>
                    </div>
                  </Col>

                  {/* Education Card */}
                  <Col md={11}>
                    <Card className="border-0 shadow-sm ms-md-4 hover-lift transition-all">
                      <Card.Body className="p-4">
                        <Row className="align-items-start">
                          {/* Left Column - Main Info */}
                          <Col lg={8}>
                            <div className="d-flex align-items-start mb-3">
                              <div className="d-md-none bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                                   style={{ 
                                     width: '40px', 
                                     height: '40px',
                                     minWidth: '40px'
                                   }}>
                                <FaUniversity className="text-white" size={16} />
                              </div>
                              <div>
                                <h4 className="fw-bold mb-1">{edu.degree}</h4>
                                <h5 className="text-primary mb-2">{edu.institution}</h5>
                              </div>
                            </div>

                            <div className="d-flex flex-wrap gap-2 mb-3">
                              {edu.category && (
                                <Badge bg="primary" className="px-3 py-1">
                                  {edu.category}
                                </Badge>
                              )}
                              
                              {edu.fieldOfStudy && (
                                <Badge bg="light" text="dark" className="px-3 py-1 border">
                                  <FaBook className="me-1" size={12} />
                                  {edu.fieldOfStudy}
                                </Badge>
                              )}
                            </div>

                            {edu.description && (
                              <p className="text-dark mb-0">{edu.description}</p>
                            )}
                          </Col>

                          {/* Right Column - Meta Info */}
                          <Col lg={4} className="mt-3 mt-lg-0">
                            <div className="bg-light rounded p-3">
                              <div className="mb-2">
                                <div className="d-flex align-items-center text-muted small mb-1">
                                  <FaCalendarAlt className="me-2" />
                                  Duration
                                </div>
                                <div className="fw-bold">
                                  {calculateDuration(edu.startYear, edu.endYear, edu.current)}
                                </div>
                              </div>

                              {edu.location && (
                                <div className="mb-2">
                                  <div className="d-flex align-items-center text-muted small mb-1">
                                    <FaMapMarkerAlt className="me-2" />
                                    Location
                                  </div>
                                  <div>{edu.location}</div>
                                </div>
                              )}

                              {edu.grade && (
                                <div>
                                  <div className="d-flex align-items-center text-muted small mb-1">
                                    <FaAward className="me-2" />
                                    Grade/Score
                                  </div>
                                  <div className="fw-bold text-success">{edu.grade}</div>
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
        </Row>


      </Container>
    </section>
  );
};

export default Education;