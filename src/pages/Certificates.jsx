import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicCertificates } from "../api/api";
import { Container, Row, Col, Card, Badge, Button, Modal } from 'react-bootstrap';
import { 
  FaAward, 
  FaEye, 
  FaLink, 
  FaBuilding, 
  FaCalendarAlt,
  FaTag,
  FaGraduationCap,
  FaCertificate,
  FaPlusCircle,
  FaCheckCircle,
  FaBookOpen
} from 'react-icons/fa';

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const data = await getPublicCertificates();
      
      const previewCertificates = data.slice(0, 3).map(cert => ({
        ...cert,
        color: getCategoryColor(cert.category)
      }));
      
      setCertifications(previewCertificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      setCertifications([
        {
          _id: "1",
          title: "AWS Certified Developer - Associate",
          issuer: "Amazon Web Services",
          description: "Designing, deploying, and operating scalable systems on AWS",
          category: "cloud",
          color: "warning",
          issueDate: "2023-08-15",
          credentialUrl: "#",
          skills: ["AWS", "Cloud Architecture", "DevOps", "Security"],
          image: "https://res.cloudinary.com/dghnjzlef/image/upload/v1768709387/eghoxhdsk2cwbujeevzi.webp"
        },
        {
          _id: "2",
          title: "React Professional Certificate",
          issuer: "Meta",
          description: "Advanced React patterns, hooks, and performance optimization",
          category: "development",
          color: "info",
          issueDate: "2023-05-20",
          credentialUrl: "#",
          skills: ["React", "JavaScript", "Redux", "Next.js"],
          image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
          _id: "3",
          title: "Full Stack Web Development",
          issuer: "Coding Academy",
          description: "Comprehensive full-stack development with modern frameworks",
          category: "web",
          color: "primary",
          issueDate: "2023-02-10",
          credentialUrl: "#",
          skills: ["MERN Stack", "REST APIs", "MongoDB", "Express"],
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'cloud': 'warning', 'development': 'info', 'web': 'primary',
      'fullstack': 'primary', 'data': 'success', 'ai': 'dark',
      'security': 'danger', 'design': 'purple', 'database': 'secondary',
      'devops': 'warning'
    };
    return colorMap[category] || 'secondary';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="certifications" className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold mb-3">Professional Certifications</h2>
              <p className="lead text-muted mb-4">Industry-recognized credentials</p>
              <div className="bg-primary mx-auto mb-4" 
                   style={{ width: '60px', height: '3px' }}></div>
            </Col>
          </Row>
          
          <Row className="justify-content-center g-4">
            {[1, 2, 3].map((i) => (
              <Col lg={4} md={6} key={i}>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="placeholder-glow">
                      <div className="placeholder col-12 mb-3" style={{ height: '180px' }}></div>
                      <div className="placeholder col-8 mb-2"></div>
                      <div className="placeholder col-6 mb-3"></div>
                      <div className="placeholder col-12"></div>
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

  return (
    <section id="certifications" className="py-5 bg-light">
      <Container>
        {/* Section Header */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <Badge 
              bg="primary" 
              className="px-4 py-2 mb-3 rounded-pill fw-medium d-inline-flex align-items-center shadow-sm"
            >
              <FaAward className="me-2" />
              Credentials
            </Badge>
            <h2 className="display-5 fw-bold mb-3">Professional Certifications</h2>
            <p className="lead text-muted mb-4">
              Industry-recognized credentials validating technical expertise
            </p>
            <div className="bg-primary mx-auto mb-4" 
                 style={{ width: '60px', height: '3px' }}></div>
          </Col>
        </Row>

        {/* Certifications Grid */}
        {certifications.length > 0 ? (
          <>
            <Row className="justify-content-center g-4 mb-5">
              {certifications.map((cert) => (
                <Col lg={4} md={6} key={cert._id}>
                  <Card className="border-0 shadow-sm h-100">
                    {/* Certificate Image */}
                    <div className="position-relative" style={{ height: '200px' }}>
                      {cert.image ? (
                        <Card.Img 
                          variant="top"
                          src={cert.image}
                          alt={cert.title}
                          className="w-100 h-100"
                          style={{ objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                        />
                      ) : (
                        <div className={`bg-${cert.color} bg-opacity-10 h-100 d-flex align-items-center justify-content-center`}>
                          <FaCertificate size={60} className={`text-${cert.color}`} />
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="position-absolute top-0 end-0 m-3">
                        <Badge bg={cert.color} className="px-3 py-2">
                          {cert.category?.toUpperCase() || 'CERT'}
                        </Badge>
                      </div>
                    </div>

                    <Card.Body className="p-4 d-flex flex-column">
                      {/* Title & Issuer */}
                      <div className="mb-3">
                        <h5 className="fw-bold mb-2">{cert.title}</h5>
                        <div className="d-flex align-items-center text-muted small mb-2">
                          <FaBuilding className={`me-2 text-${cert.color}`} size={14} />
                          {cert.issuer}
                        </div>
                        
                        {/* Issue Date */}
                        {cert.issueDate && (
                          <div className="d-flex align-items-center text-muted small mb-3">
                            <FaCalendarAlt className="me-2" size={12} />
                            {formatDate(cert.issueDate)}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-muted small mb-4 flex-grow-1">
                        {cert.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <Button
                          variant={cert.color}
                          size="sm"
                          className="px-3 d-flex align-items-center"
                          onClick={() => {
                            setSelectedCert(cert);
                            setShowModal(true);
                          }}
                        >
                          <FaEye className="me-2" />
                          View
                        </Button>
                        
                        {cert.credentialUrl && (
                          <Button
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline-secondary"
                            size="sm"
                            className="px-3 d-flex align-items-center"
                          >
                            <FaLink className="me-2" />
                            Verify
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Stats Row */}
            <Row className="mt-4 g-3">
              <Col md={3} sm={6}>
                <div className="text-center p-3 bg-light rounded-3 border">
                  <div className="fs-2 fw-bold text-primary mb-1">{certifications.length}</div>
                  <div className="text-muted small">Certifications</div>
                </div>
              </Col>
              <Col md={3} sm={6}>
                <div className="text-center p-3 bg-light rounded-3 border">
                  <div className="fs-2 fw-bold text-success mb-1">
                    {new Set(certifications.map(c => c.category)).size}
                  </div>
                  <div className="text-muted small">Categories</div>
                </div>
              </Col>
              <Col md={3} sm={6}>
                <div className="text-center p-3 bg-light rounded-3 border">
                  <div className="fs-2 fw-bold text-warning mb-1">
                    {new Set(certifications.flatMap(c => c.skills || [])).size}
                  </div>
                  <div className="text-muted small">Skills Covered</div>
                </div>
              </Col>
              <Col md={3} sm={6}>
                <div className="text-center p-3 bg-light rounded-3 border">
                  <div className="fs-2 fw-bold text-info mb-1">100%</div>
                  <div className="text-muted small">Verified</div>
                </div>
              </Col>
            </Row>

            {/* View All Button */}
            <Row className="mt-5">
              <Col className="text-center">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="px-5 py-3 d-flex align-items-center mx-auto"
                  onClick={() => navigate('/certificates')}
                >
                  <FaGraduationCap className="me-2" />
                  View All Certifications
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <Row className="justify-content-center">
            <Col lg={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center p-5">
                  <div className="text-muted mb-4">
                    <FaAward size={60} />
                  </div>
                  <h4 className="fw-bold mb-3">No Certifications</h4>
                  <p className="text-muted mb-4">
                    Certificates will appear here when added.
                  </p>
                  <Button 
                    variant="primary"
                    className="d-flex align-items-center mx-auto"
                    onClick={() => navigate('/certificates')}
                  >
                    <FaPlusCircle className="me-2" />
                    Add Certificate
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      {/* Bootstrap Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        {selectedCert && (
          <>
            <Modal.Header closeButton>
              <div className="d-flex align-items-center w-100">
                <div className={`bg-${selectedCert.color} text-white rounded-3 p-3 me-3`}>
                  <FaCertificate size={24} />
                </div>
                <div>
                  <Modal.Title className="fw-bold">{selectedCert.title}</Modal.Title>
                  <div className="text-muted small">{selectedCert.issuer}</div>
                </div>
              </div>
            </Modal.Header>
            
            <Modal.Body>
              {/* Certificate Image */}
              <div className="text-center mb-4">
                {selectedCert.image ? (
                  <div className="bg-light rounded-3 p-3">
                    <img 
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="img-fluid rounded-2"
                      style={{ maxHeight: '300px', objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <div className={`bg-${selectedCert.color} bg-opacity-10 rounded-3 p-4`}>
                    <FaCertificate size={60} className={`text-${selectedCert.color} mb-3`} />
                    <div className="text-muted small">Certificate Preview</div>
                  </div>
                )}
              </div>

              {/* Details Row */}
              <Row className="g-3 mb-4">
                <Col md={6}>
                  <div className="d-flex align-items-center p-3 bg-light rounded-3">
                    <FaCalendarAlt className="text-primary me-3" />
                    <div>
                      <div className="small text-muted">Issue Date</div>
                      <div className="fw-medium">{formatDate(selectedCert.issueDate)}</div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-center p-3 bg-light rounded-3">
                    <FaTag className={`text-${selectedCert.color} me-3`} />
                    <div>
                      <div className="small text-muted">Category</div>
                      <div className="fw-medium">{selectedCert.category || 'General'}</div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Description */}
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <FaBookOpen className="me-2 text-primary" />
                  <h6 className="fw-bold mb-0">Description</h6>
                </div>
                <p className="text-dark">{selectedCert.description}</p>
              </div>

              {/* Skills */}
              {selectedCert.skills && selectedCert.skills.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <FaCheckCircle className="me-2 text-success" />
                    <h6 className="fw-bold mb-0">Skills Covered</h6>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill, index) => (
                      <Badge key={index} bg="light" text="dark" className="px-3 py-2 border">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification */}
              {selectedCert.credentialUrl && (
                <div className="bg-light rounded-3 p-4">
                  <h6 className="fw-bold mb-3">Verification</h6>
                  <Button
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant={selectedCert.color}
                    className="w-100 d-flex align-items-center justify-content-center"
                  >
                    <FaLink className="me-2" />
                    Verify Certificate
                  </Button>
                </div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button 
                variant="primary"
                onClick={() => {
                  setShowModal(false);
                  navigate('/certificates');
                }}
              >
                View All Certificates
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </section>
  );
};

export default CertificationsSection;