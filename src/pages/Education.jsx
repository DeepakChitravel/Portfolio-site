import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBook,
  FaAward,
  FaUniversity
} from 'react-icons/fa';

const Education = ({ education, loading }) => {

  const calculateDuration = (startYear, endYear, current) => {
    if (current) return `${startYear} - Present`;
    return `${startYear} - ${endYear}`;
  };

  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-4 py-md-5 bg-light">
      <Container>

        {/* Header */}
        <Row className="mb-4 mb-md-5">
          <Col lg={8} className="mx-auto text-center">
            <Badge bg="primary" className="px-3 py-2 mb-3 rounded-pill shadow-sm">
              <FaGraduationCap className="me-2" />
              Academic Journey
            </Badge>

            <h2 className="fw-bold mb-2">Education</h2>
            <p className="text-muted">Academic background and certifications</p>

            <div className="bg-primary mx-auto mt-3"
              style={{ width: '50px', height: '3px' }}></div>
          </Col>
        </Row>

        {/* Cards */}
        <Row className="justify-content-center">
          <Col lg={10}>

            {education.map((edu, index) => (
              <div key={index} className="mb-4 position-relative">

                <Card className="border-0 shadow-sm education-card">
                  <Card.Body className="p-3 p-md-4">

                    <Row>

                      {/* LEFT SIDE */}
                      <Col lg={8}>

                        <div className="d-flex align-items-start mb-2">

                          {/* Icon */}
                          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
                            style={{
                              width: '36px',
                              height: '36px',
                              minWidth: '36px'
                            }}>
                            <FaUniversity className="text-white" size={14} />
                          </div>

                          {/* Text */}
                          <div>
                            <h5 className="fw-bold mb-1 text-dark">
                              {edu.degree}
                            </h5>

                            <p className="text-primary mb-2 fw-semibold small">
                              {edu.institution}
                            </p>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="d-flex flex-wrap gap-2 mb-2">

                          {edu.category && (
                            <Badge bg="primary" className="px-2 py-1 small">
                              {edu.category}
                            </Badge>
                          )}

                          {edu.fieldOfStudy && (
                            <Badge bg="light" text="dark" className="px-2 py-1 border small">
                              <FaBook className="me-1" size={10} />
                              {edu.fieldOfStudy}
                            </Badge>
                          )}

                        </div>

                        {/* Description */}
                        {edu.description && (
                          <p className="text-muted small mb-0">
                            {edu.description}
                          </p>
                        )}

                      </Col>

                      {/* RIGHT SIDE */}
                      <Col lg={4} className="mt-3 mt-lg-0">

                        <div className="bg-light rounded-3 p-3 border">

                          {/* Duration */}
                          <div className="mb-2">
                            <div className="text-muted small mb-1 d-flex align-items-center">
                              <FaCalendarAlt className="me-2" />
                              Duration
                            </div>
                            <div className="fw-semibold text-dark small">
                              {calculateDuration(edu.startYear, edu.endYear, edu.current)}
                            </div>
                          </div>

                          {/* Location */}
                          {edu.location && (
                            <div className="mb-2">
                              <div className="text-muted small mb-1 d-flex align-items-center">
                                <FaMapMarkerAlt className="me-2" />
                                Location
                              </div>
                              <div className="small text-dark">
                                {edu.location}
                              </div>
                            </div>
                          )}

                          {/* Grade */}
                          {edu.grade && (
                            <div>
                              <div className="text-muted small mb-1 d-flex align-items-center">
                                <FaAward className="me-2" />
                                Grade
                              </div>
                              <div className="fw-semibold text-success small">
                                {edu.grade}
                              </div>
                            </div>
                          )}

                        </div>

                      </Col>

                    </Row>

                  </Card.Body>
                </Card>

              </div>
            ))}

          </Col>
        </Row>

      </Container>

      {/* ✅ STYLES */}
      <style jsx>{`

        /* Card hover */
        .education-card {
          transition: all 0.3s ease;
          border-radius: 12px;
        }

        .education-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        /* Mobile improvements */
        @media (max-width: 576px) {

          h5 {
            font-size: 1rem;
          }

          p {
            font-size: 0.85rem;
          }

          .bg-light {
            font-size: 0.85rem;
          }

        }

      `}</style>

    </section>
  );
};

export default Education;