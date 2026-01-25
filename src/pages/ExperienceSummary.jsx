import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { 
  FaBriefcase, 
  FaChartLine, 
  FaRocket, 
  FaUsers, 
  FaLightbulb,
  FaHandshake
} from 'react-icons/fa';

const ExperienceSummary = () => {
  const highlights = [
    {
      id: 1,
      icon: <FaBriefcase size={28} />,
      title: "Professional Experience",
      description: "2+ years in full-stack development, specializing in React, Node.js, and cloud technologies",
      stats: "2+ Years",
      color: "primary",
      emoji: "💼"
    },
    {
      id: 2,
      icon: <FaChartLine size={28} />,
      title: "Technical Expertise",
      description: "Modern web applications, REST APIs, database design, and scalable architecture",
      stats: "15+ Projects",
      color: "success",
      emoji: "🎯"
    },
    {
      id: 3,
      icon: <FaRocket size={28} />,
      title: "Project Delivery",
      description: "15+ successful projects delivered on time with high client satisfaction",
      stats: "100% Success",
      color: "warning",
      emoji: "🚀"
    },
    {
      id: 4,
      icon: <FaUsers size={28} />,
      title: "Team Collaboration",
      description: "Experienced in Agile methodologies and cross-functional team leadership",
      stats: "10+ Teams",
      color: "info",
      emoji: "👥"
    },
    {
      id: 5,
      icon: <FaLightbulb size={28} />,
      title: "Problem Solving",
      description: "Strong analytical skills with focus on innovative technical solutions",
      stats: "50+ Solutions",
      color: "danger",
      emoji: "💡"
    },
    {
      id: 6,
      icon: <FaHandshake size={28} />,
      title: "Client Relations",
      description: "Proven track record of maintaining strong client relationships and satisfaction",
      stats: "95% Rating",
      color: "purple",
      emoji: "🤝"
    }
  ];

  return (
    <section id="experience" className="py-5 bg-light">
      <Container>
        {/* Section Header */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <Badge 
              bg="primary" 
              className="px-4 py-2 mb-3 rounded-pill fw-medium d-inline-flex align-items-center shadow-sm"
            >
              <FaBriefcase className="me-2" />
              Professional Journey
            </Badge>
            <h2 className="display-5 fw-bold mb-3">Experience Highlights</h2>
            <p className="lead text-muted mb-4">
              Key experience and expertise areas
            </p>
            <div className="bg-primary mx-auto mb-4" 
                 style={{ width: '60px', height: '3px' }}></div>
          </Col>
        </Row>

        {/* Highlights Grid */}
        <Row className="g-4">
          {highlights.map((item) => (
            <Col lg={4} md={6} key={item.id}>
              <Card className="border-0 shadow-sm h-100 hover-lift transition-all">
                <Card.Body className="p-4 d-flex flex-column">
                  {/* Icon Section */}
                  <div className="d-flex align-items-center mb-3">
                    <div className={`bg-${item.color} bg-opacity-10 text-${item.color} rounded-3 p-3 me-3`}>
                      {item.icon}
                    </div>
                    <div className="ms-2">
                      <span className="fs-3">{item.emoji}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="fw-bold mb-3">{item.title}</h4>

                  {/* Description */}
                  <p className="text-muted mb-4 flex-grow-1">
                    {item.description}
                  </p>

                  {/* Stats Badge */}
                  <div className="mt-auto">
                    <Badge 
                      bg={item.color} 
                      className="px-3 py-2 d-inline-flex align-items-center fw-medium"
                      style={{ fontSize: '0.9rem' }}
                    >
                      {item.stats}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Experience Summary Card */}


        {/* Quick Stats */}
        <Row className="mt-4 g-3">
          <Col md={3} sm={6}>
            <div className="text-center p-3 bg-white rounded-3 border">
              <div className="fs-2 fw-bold text-primary mb-1">2+</div>
              <div className="text-muted small">Years Experience</div>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="text-center p-3 bg-white rounded-3 border">
              <div className="fs-2 fw-bold text-success mb-1">15+</div>
              <div className="text-muted small">Projects Delivered</div>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="text-center p-3 bg-white rounded-3 border">
              <div className="fs-2 fw-bold text-warning mb-1">100%</div>
              <div className="text-muted small">Success Rate</div>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="text-center p-3 bg-white rounded-3 border">
              <div className="fs-2 fw-bold text-info mb-1">95%</div>
              <div className="text-muted small">Client Satisfaction</div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ExperienceSummary;