import { useEffect, useState, useRef } from "react";
import { getPublicProjects } from "../api/api.js";
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { 
  FaCode, 
  FaExternalLinkAlt, 
  FaGithub, 
  FaLaptopCode,
  FaTools,
  FaInfoCircle,
  FaArrowRight,
  FaMousePointer,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaImages
} from 'react-icons/fa';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const imageRefs = useRef({});
  const scrollIntervals = useRef({});
  const carouselRef = useRef(null);
  
  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = currentPage * projectsPerPage;
  const visibleProjects = projects.slice(startIndex, startIndex + projectsPerPage);

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
          },
          {
            _id: "4",
            title: "AI Content Generator",
            shortIntro: "AI-powered content creation tool",
            description: "Advanced content generation platform using machine learning for blog posts, social media, and marketing copy.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            liveUrl: "#",
            githubUrl: "#",
            technologies: ["Python", "TensorFlow", "React", "FastAPI"]
          },
          {
            _id: "5",
            title: "Analytics Dashboard",
            shortIntro: "Real-time data visualization platform",
            description: "Interactive analytics dashboard with customizable widgets and real-time data updates.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            liveUrl: "#",
            githubUrl: "#",
            technologies: ["D3.js", "Vue.js", "Node.js", "MongoDB"]
          }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      Object.values(scrollIntervals.current).forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  const startAutoScroll = (projectId) => {
    // Clear any existing interval for this project
    if (scrollIntervals.current[projectId]) {
      clearInterval(scrollIntervals.current[projectId]);
    }

    const imgElement = imageRefs.current[projectId];
    if (!imgElement) return;

    const container = imgElement.parentElement;
    const containerHeight = container.clientHeight;
    const imgHeight = imgElement.scrollHeight;

    // Only scroll if image is taller than container
    if (imgHeight <= containerHeight) return;

    const maxScroll = -(imgHeight - containerHeight);
    let currentScroll = 0;
    let direction = 1; // 1 for down, -1 for up

    setHoveredProject(projectId);

    // Start auto-scrolling
    scrollIntervals.current[projectId] = setInterval(() => {
      // Change direction at boundaries
      if (currentScroll <= maxScroll) {
        direction = 1; // Scroll up
      } else if (currentScroll >= 0) {
        direction = -1; // Scroll down
      }

      // Update scroll position (medium speed: 2px per frame)
      currentScroll += direction * 2;
      
      // Apply the transform
      imgElement.style.transition = 'none';
      imgElement.style.transform = `translateY(${currentScroll}px)`;
    }, 20); // 50fps for smooth animation
  };

  const stopAutoScroll = (projectId) => {
    setHoveredProject(null);
    
    // Clear the interval
    if (scrollIntervals.current[projectId]) {
      clearInterval(scrollIntervals.current[projectId]);
      delete scrollIntervals.current[projectId];
    }

    // Reset image position smoothly
    const imgElement = imageRefs.current[projectId];
    if (imgElement) {
      imgElement.style.transition = 'transform 0.5s ease-out';
      imgElement.style.transform = 'translateY(0)';
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold mb-3">Featured Projects</h2>
              <p className="lead text-muted mb-4">Showcasing my work and technical implementations</p>
              <div className="bg-primary mx-auto mb-4" style={{ width: '60px', height: '3px' }}></div>
            </Col>
          </Row>
          
          <Row className="justify-content-center g-4">
            {[1, 2, 3].map((i) => (
              <Col lg={4} md={6} key={i}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className="placeholder-glow">
                      <div className="placeholder col-12 mb-3 bg-secondary" style={{ height: '300px' }}></div>
                      <div className="placeholder col-8 mb-2"></div>
                      <div className="placeholder col-6 mb-3"></div>
                      <div className="placeholder col-12 mb-4"></div>
                      <div className="placeholder col-10"></div>
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
      <section id="projects" className="py-5 bg-light">
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
              <div className="bg-primary mx-auto mb-4" style={{ width: '60px', height: '3px' }}></div>
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
            <div className="bg-primary mx-auto mb-4" style={{ width: '60px', height: '3px' }}></div>
          </Col>
        </Row>

        {/* Projects Carousel */}
        <div ref={carouselRef} className="position-relative">
          {/* Navigation Buttons - Only show if more than 3 projects */}
          {projects.length > 3 && (
            <>
              <Button
                variant="light"
                className="position-absolute top-50 start-0 translate-middle-y z-3 shadow-lg rounded-circle"
                style={{ 
                  left: '-20px',
                  width: '48px', 
                  height: '48px',
                  opacity: currentPage === 0 ? 0.5 : 1,
                  cursor: currentPage === 0 ? 'not-allowed' : 'pointer'
                }}
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                <FaChevronLeft />
              </Button>
              
              <Button
                variant="light"
                className="position-absolute top-50 end-0 translate-middle-y z-3 shadow-lg rounded-circle"
                style={{ 
                  right: '-20px',
                  width: '48px', 
                  height: '48px',
                  opacity: currentPage === totalPages - 1 ? 0.5 : 1,
                  cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer'
                }}
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              >
                <FaChevronRight />
              </Button>
            </>
          )}

          {/* Projects Grid */}
          <Row className="g-4 justify-content-center">
            {visibleProjects.map((project) => (
              <Col lg={4} md={6} key={project._id}>
                <Card 
                  className="border-0 shadow-sm h-100"
                  onMouseEnter={() => startAutoScroll(project._id)}
                  onMouseLeave={() => stopAutoScroll(project._id)}
                  style={{ 
                    transition: 'all 0.3s ease',
                    transform: hoveredProject === project._id ? 'translateY(-8px)' : 'translateY(0)',
                  }}
                >
                  {/* Project Image Container - Auto-scroll enabled */}
                  <div 
                    className="position-relative" 
                    style={{ 
                      height: '300px',
                      backgroundColor: '#f8f9fa',
                      overflow: 'hidden',
                      borderTopLeftRadius: 'calc(0.375rem - 1px)',
                      borderTopRightRadius: 'calc(0.375rem - 1px)',
                    }}
                  >
                    {/* Image with proper sizing for auto-scroll */}
                    <img 
                      ref={el => imageRefs.current[project._id] = el}
                      src={project.image}
                      alt={project.title}
                      style={{ 
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        transform: 'translateY(0)',
                        pointerEvents: 'none', // Prevents image from interfering with hover
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x600?text=Project+Image';
                      }}
                      onLoad={(e) => {
                        // Preload image dimensions
                        const img = e.target;
                        img.setAttribute('data-loaded', 'true');
                      }}
                    />
                    
                    {/* Gradient Overlay for better text readability */}
                    <div className="position-absolute top-0 start-0 w-100 h-100"
                         style={{
                           background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.1) 100%)',
                           pointerEvents: 'none'
                         }}>
                    </div>
                    

                    
                    {/* Featured Badge */}
                    <div className="position-absolute top-0 end-0 m-3">
                      <Badge bg="white" text="dark" className="px-3 py-2 shadow-sm">
                        <FaStar className="me-2 text-warning" />
                        Featured
                      </Badge>
                    </div>
                    
                    {/* Technology Count Badge */}
                    {project.technologies && (
                      <div className="position-absolute bottom-0 start-0 m-3">
                        <Badge bg="primary" className="px-3 py-2 shadow-sm">
                          <FaTools className="me-2" />
                          {project.technologies.length} {project.technologies.length === 1 ? 'Tech' : 'Technologies'}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <Card.Body className="p-4 d-flex flex-column">
                    {/* Project Title and Type */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h4 className="fw-bold mb-0" style={{ fontSize: '1.25rem' }}>{project.title}</h4>
                        <Badge bg="primary" className="px-2 py-1" style={{ fontSize: '0.7rem' }}>
                          Web App
                        </Badge>
                      </div>
                      
                      {project.shortIntro && (
                        <div className="d-flex align-items-center text-muted small">
                          <FaInfoCircle className="me-2 flex-shrink-0" size={14} />
                          <span className="text-truncate">{project.shortIntro}</span>
                        </div>
                      )}
                    </div>

                    {/* Project Description */}
                    <p className="text-secondary mb-4" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                      {project.description.length > 100 
                        ? `${project.description.substring(0, 100)}...` 
                        : project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mb-4">
                        <div className="d-flex align-items-center mb-2">
                          <FaTools className="me-2 text-primary" size={16} />
                          <h6 className="fw-bold mb-0" style={{ fontSize: '0.9rem' }}>Tech Stack</h6>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <Badge 
                              key={index}
                              bg="light" 
                              text="dark" 
                              className="px-3 py-2 rounded-pill border"
                              style={{ fontSize: '0.75rem' }}
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge 
                              bg="light" 
                              text="dark" 
                              className="px-3 py-2 rounded-pill border"
                              style={{ fontSize: '0.75rem' }}
                            >
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                      <div className="d-flex gap-2">
                        {project.liveUrl && project.liveUrl !== '#' && (
                          <Button
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            size="sm"
                            className="px-3 d-flex align-items-center"
                            style={{ fontSize: '0.85rem' }}
                          >
                            <FaExternalLinkAlt className="me-2" size={12} />
                            Live
                          </Button>
                        )}
                        {project.githubUrl && project.githubUrl !== '#' && (
                          <Button
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline-secondary"
                            size="sm"
                            className="px-3 d-flex align-items-center"
                            style={{ fontSize: '0.85rem' }}
                          >
                            <FaGithub className="me-2" size={12} />
                            Code
                          </Button>
                        )}
                      </div>
                      <Button 
                        variant="link" 
                        className="text-decoration-none p-0 d-flex align-items-center"
                        style={{ color: '#0d6efd', fontSize: '0.85rem' }}
                        onClick={() => {/* Add modal functionality */}}
                      >
                        Details
                        <FaArrowRight className="ms-2" size={12} />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Pagination Indicators */}
        {projects.length > 3 && (
          <Row className="mt-4">
            <Col className="d-flex justify-content-center align-items-center">
              <div className="d-flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className="btn btn-link p-0"
                    style={{ 
                      width: '10px', 
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: currentPage === index ? '#0d6efd' : '#dee2e6',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </Col>
          </Row>
        )}

        {/* Stats Section */}
        <Row className="mt-5 g-3">
          <Col md={3} sm={6}>
            <div className="text-center p-3 bg-white rounded-3 shadow-sm">
              <div className="fs-2 fw-bold text-primary mb-1">{projects.length}</div>
              <div className="text-muted small">Total Projects</div>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="text-center p-3 bg-white rounded-3 shadow-sm">
              <div className="fs-2 fw-bold text-success mb-1">
                {projects.filter(p => p.liveUrl && p.liveUrl !== '#').length}
              </div>
              <div className="text-muted small">Live Demos</div>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="text-center p-3 bg-white rounded-3 shadow-sm">
              <div className="fs-2 fw-bold text-warning mb-1">
                {new Set(projects.flatMap(p => p.technologies || [])).size}
              </div>
              <div className="text-muted small">Technologies</div>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="text-center p-3 bg-white rounded-3 shadow-sm">
              <div className="fs-2 fw-bold text-info mb-1">
                {projects.length > 0 ? Math.round(projects.filter(p => p.githubUrl && p.githubUrl !== '#').length / projects.length * 100) : 0}%
              </div>
              <div className="text-muted small">Open Source</div>
            </div>
          </Col>
        </Row>

        {/* Interactive Hint */}
        <Row className="mt-4">
          <Col className="text-center">
            <div className="text-muted small d-flex align-items-center justify-content-center bg-white p-3 rounded-3 shadow-sm d-inline-flex mx-auto" style={{ maxWidth: 'fit-content' }}>
              <FaMousePointer className="me-2 text-primary" />
              Hover over images for auto-scroll preview
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectsSection;