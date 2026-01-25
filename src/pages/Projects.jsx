import { useEffect, useState, useRef } from "react";
import { getPublicProjects } from "../api/api.js";
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { 
  FaCode, 
  FaExternalLinkAlt, 
  FaGithub, 
  FaLaptopCode,
  FaTools,
  FaEye,
  FaInfoCircle,
  FaArrowRight,
  FaMousePointer,
  FaStar,
  FaArrowDown
} from 'react-icons/fa';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  const imageRefs = useRef({});

  useEffect(() => {
    getPublicProjects()
      .then((data) => {
        console.log("PROJECTS FROM API →", data);
        setProjects(data);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setProjects([
          {
            _id: "1",
            title: "E-Commerce Platform",
            shortIntro: "Full-featured online shopping platform",
            description: "A complete e-commerce solution with user authentication, product catalog, shopping cart, and payment integration.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            liveUrl: "#",
            githubUrl: "#",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"]
          },
          {
            _id: "2",
            title: "Task Management App",
            shortIntro: "Productivity tool for team collaboration",
            description: "Real-time task management application with drag-and-drop functionality and team collaboration features.",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            liveUrl: "#",
            githubUrl: "#",
            technologies: ["React", "Express", "Socket.io", "PostgreSQL"]
          },
          {
            _id: "3",
            title: "Weather Dashboard",
            shortIntro: "Real-time weather monitoring application",
            description: "Interactive weather dashboard showing current conditions, forecasts, and historical data with maps integration.",
            image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            liveUrl: "#",
            githubUrl: "#",
            technologies: ["JavaScript", "API Integration", "Chart.js", "Bootstrap"]
          }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleMouseEnter = (projectId) => {
    setHoveredProject(projectId);
    const imgElement = imageRefs.current[projectId];
    if (imgElement) {
      imgElement.style.transition = 'transform 8s ease-in-out';
      imgElement.style.transform = 'translateY(-30%)';
    }
  };

  const handleMouseLeave = (projectId) => {
    setHoveredProject(null);
    const imgElement = imageRefs.current[projectId];
    if (imgElement) {
      imgElement.style.transition = 'transform 2s ease-in-out';
      imgElement.style.transform = 'translateY(0)';
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-5 bg-white">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold mb-3">Featured Projects</h2>
              <p className="lead text-muted mb-4">Showcasing my work and technical implementations</p>
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
                      <div className="placeholder col-12 mb-3" style={{ height: '220px' }}></div>
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

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-5 bg-white">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <Badge 
                bg="primary" 
                className="px-4 py-2 mb-3 rounded-pill fw-medium d-inline-flex align-items-center shadow-sm"
              >
                <FaCode className="me-2" />
                Portfolio
              </Badge>
              <h2 className="display-5 fw-bold mb-3">My Projects</h2>
              <p className="lead text-muted mb-4">Showcasing my work and technical implementations</p>
              <div className="bg-primary mx-auto mb-4" 
                   style={{ width: '60px', height: '3px' }}></div>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            <Col lg={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center p-5">
                  <div className="text-muted mb-4">
                    <FaLaptopCode size={60} />
                  </div>
                  <h4 className="fw-bold mb-3">No Projects Yet</h4>
                  <p className="text-muted mb-0">
                    Projects will appear here once they are added.
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
    <section id="projects" className="py-5 bg-light">
      <Container>
        {/* Section Header */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <Badge 
              bg="primary" 
              className="px-4 py-2 mb-3 rounded-pill fw-medium d-inline-flex align-items-center shadow-sm"
            >
              <FaCode className="me-2" />
              Portfolio Showcase
            </Badge>
            <h2 className="display-5 fw-bold mb-3">Featured Projects</h2>
            <p className="lead text-muted mb-4">
              Interactive showcase of web applications and technical implementations
            </p>
            <div className="bg-primary mx-auto mb-4" 
                 style={{ width: '60px', height: '3px' }}></div>
          </Col>
        </Row>

        {/* Projects Grid */}
        <Row className="g-4 justify-content-center">
          {projects.slice(0, 3).map((project) => (
            <Col lg={4} md={6} key={project._id}>
              <Card 
                className="border-0 shadow-sm h-100"
                onMouseEnter={() => handleMouseEnter(project._id)}
                onMouseLeave={() => handleMouseLeave(project._id)}
                style={{ 
                  transition: 'all 0.3s ease',
                  transform: hoveredProject === project._id ? 'translateY(-8px)' : 'translateY(0)'
                }}
              >
                {/* Project Image Container */}
                <div 
                  className="position-relative overflow-hidden" 
                  style={{ 
                    height: '240px',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  {/* Project Image */}
                  <img 
                    ref={el => imageRefs.current[project._id] = el}
                    src={project.image}
                    alt={project.title}
                    className="w-100 h-100"
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'top',
                      transition: 'transform 8s ease-in-out'
                    }}
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="position-absolute top-0 start-0 w-100 h-100"
                       style={{
                         background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)'
                       }}>
                  </div>
                  
                  {/* Hover Indicator */}
                  <div className={`position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center ${
                    hoveredProject === project._id ? 'opacity-100' : 'opacity-0'
                  }`}
                       style={{ 
                         transition: 'opacity 0.3s ease',
                         background: 'rgba(0,0,0,0.5)',
                         backdropFilter: 'blur(2px)'
                       }}>
                    <div className="text-center text-white">
                      <div className="bg-primary rounded-circle p-3 d-inline-flex align-items-center justify-content-center mb-3">
                        <FaArrowDown size={24} />
                      </div>
                      <div className="fw-medium mb-1">Scroll Preview</div>
                      <div className="small opacity-75">Top to bottom view</div>
                    </div>
                  </div>
                  
                  {/* Project Badge */}
                  <div className="position-absolute top-0 end-0 m-3">
                    <Badge bg="white" text="dark" className="px-3 py-2 shadow-sm">
                      <FaStar className="me-2 text-warning" />
                      Featured
                    </Badge>
                  </div>
                  
                  {/* Technology Count */}
                  {project.technologies && (
                    <div className="position-absolute bottom-0 start-0 m-3">
                      <Badge bg="primary" className="px-3 py-2 shadow-sm">
                        <FaTools className="me-2" />
                        {project.technologies.length} Tech
                      </Badge>
                    </div>
                  )}
                </div>

                <Card.Body className="p-4 d-flex flex-column">
                  {/* Project Header */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h4 className="fw-bold mb-0">{project.title}</h4>
                      <Badge bg="primary" className="px-2 py-1">
                        Web
                      </Badge>
                    </div>
                    
                    {project.shortIntro && (
                      <div className="d-flex align-items-center text-muted small mb-3">
                        <FaInfoCircle className="me-2" size={14} />
                        {project.shortIntro}
                      </div>
                    )}
                  </div>

                  {/* Project Description */}
                  <p className="text-dark mb-4 flex-grow-1">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-2">
                        <FaTools className="me-2 text-primary" size={16} />
                        <h6 className="fw-bold mb-0">Tech Stack</h6>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech, index) => (
                          <Badge 
                            key={index}
                            bg="light" 
                            text="dark" 
                            className="px-3 py-1 border"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 5 && (
                          <Badge bg="light" text="dark" className="px-3 py-1 border">
                            +{project.technologies.length - 5}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-between align-items-center mt-auto pt-4 border-top">
                    <div className="d-flex gap-2">
                      {project.liveUrl && (
                        <Button
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="primary"
                          size="sm"
                          className="px-3 d-flex align-items-center"
                        >
                          <FaExternalLinkAlt className="me-2" />
                          Live
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline-dark"
                          size="sm"
                          className="px-3 d-flex align-items-center"
                        >
                          <FaGithub className="me-2" />
                          Code
                        </Button>
                      )}
                    </div>
                    <Button 
                      variant="link" 
                      className="text-decoration-none text-dark p-0 d-flex align-items-center"
                      onClick={() => {/* Add modal functionality */}}
                    >
                      Details
                      <FaArrowRight className="ms-2" />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>



        {/* Quick Stats */}
        <Row className="mt-4 g-3">
          <Col md={3} sm={6}>
            <div className="text-center p-3 bg-white rounded-3 border">
              <div className="fs-2 fw-bold text-primary mb-1">{projects.length}</div>
              <div className="text-muted small">Projects</div>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="text-center p-3 bg-white rounded-3 border">
              <div className="fs-2 fw-bold text-success mb-1">
                {projects.filter(p => p.liveUrl).length}
              </div>
              <div className="text-muted small">Live Demos</div>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="text-center p-3 bg-white rounded-3 border">
              <div className="fs-2 fw-bold text-warning mb-1">
                {new Set(projects.flatMap(p => p.technologies || [])).size}
              </div>
              <div className="text-muted small">Technologies</div>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="text-center p-3 bg-white rounded-3 border">
              <div className="fs-2 fw-bold text-info mb-1">100%</div>
              <div className="text-muted small">Success Rate</div>
            </div>
          </Col>
        </Row>

        {/* View All Button & Instructions */}
        {projects.length > 3 && (
          <Row className="mt-5">
            <Col className="text-center">
              <Button variant="primary" size="lg" className="px-5 py-3">
                <FaLaptopCode className="me-2" />
                View All Projects
              </Button>
              <div className="text-muted small mt-3 d-flex align-items-center justify-content-center">
                <FaMousePointer className="me-2" />
                Hover over project images to scroll through screenshots
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default ProjectsSection;