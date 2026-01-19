import { useEffect, useState, useRef } from "react";
import { getPublicProjects } from "../api/api.js";

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
    // ⚡ CHANGE THIS NUMBER - Smaller = Faster (was 8s)
    imgElement.style.transition = 'transform 3s ease-in-out'; // Changed from 8s to 3s
    imgElement.style.transform = 'translateY(-70%)';
  }
};

const handleMouseLeave = (projectId) => {
  setHoveredProject(null);
  const imgElement = imageRefs.current[projectId];
  if (imgElement) {
    // ⚡ CHANGE THIS NUMBER - Smaller = Faster (was 3s)
    imgElement.style.transition = 'transform 1.5s ease-in-out'; // Changed from 3s to 1.5s
    imgElement.style.transform = 'translateY(0)';
  }
};

// Also update the CSS at the bottom:
<style jsx>{`
  .project-image {
    transition: transform 3s ease-in-out !important; // Changed from 8s to 3s
    will-change: transform;
  }
`}</style>

  if (loading) {
    return (
      <section className="py-6 py-lg-8 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <div className="placeholder-glow">
              <div className="placeholder col-3 mx-auto" style={{height: '40px'}}></div>
            </div>
          </div>
          <div className="row g-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="placeholder-glow">
                      <div className="placeholder rounded-3 mb-3" style={{height: '200px'}}></div>
                      <div className="placeholder col-8 mb-2"></div>
                      <div className="placeholder col-6 mb-3"></div>
                      <div className="placeholder col-12"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-6 py-lg-8 bg-light">
        <div className="container">
          <div className="text-center">
            <span className="badge bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-pill mb-3">
              <i className="bi bi-code-square me-2"></i>Projects
            </span>
            <h2 className="display-5 fw-bold mb-3">My Projects</h2>
            <p className="lead text-muted mb-4">Showcasing my work and technical implementations</p>
          </div>
          <div className="text-center py-5">
            <div className="display-1 text-muted mb-3">
              <i className="bi bi-code-slash"></i>
            </div>
            <h4 className="fw-bold mb-3">No Projects Yet</h4>
            <p className="text-muted">Projects will appear here once they are added.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 py-lg-8 bg-light" id="projects">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5 mb-lg-6">
          <span className="badge bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-pill mb-4">
            <i className="bi bi-code-square me-2"></i>Portfolio Showcase
          </span>
          <h2 className="display-5 fw-bold mb-3">Featured Projects</h2>
          <p className="lead text-muted mb-4 mx-auto" style={{maxWidth: '700px'}}>
            Interactive showcase of web applications and technical implementations
          </p>
          <div className="text-muted small">
            <i className="bi bi-info-circle me-1"></i>
            Hover over images to explore full project screenshots
          </div>
        </div>

        {/* Projects Grid */}
        <div className="row g-4 g-lg-5">
          {projects.slice(0, 3).map((project) => (
            <div key={project._id} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm overflow-hidden project-card">
                {/* Project Image Container */}
                <div 
                  className="position-relative project-image-container rounded-top overflow-hidden"
                  style={{height: '220px'}}
                  onMouseEnter={() => handleMouseEnter(project._id)}
                  onMouseLeave={() => handleMouseLeave(project._id)}
                >
                  {project.image ? (
                    <>
                      <img 
                        ref={el => imageRefs.current[project._id] = el}
                        src={project.image}
                        alt={project.title}
                        className="project-image img-fluid w-100"
                        style={{
                          height: '300px',
                          objectFit: 'cover',
                          objectPosition: 'top center'
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-dark"></div>
                      
                      {/* Hover Overlay */}
                      <div className={`position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center transition-opacity ${
                        hoveredProject === project._id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="text-white text-center">
                          <i className="bi bi-arrow-down display-4 mb-3"></i>
                          <div className="fw-medium mb-1">Scrolling Preview</div>
                          <div className="small opacity-75">Top to bottom view</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="bg-primary bg-opacity-10 h-100 d-flex align-items-center justify-content-center rounded-top">
                      <i className="bi bi-code-slash display-4 text-primary"></i>
                    </div>
                  )}
                  
                  {/* Project Badge */}
                  <div className="position-absolute top-0 end-0 m-4">
                    <span className="badge bg-white text-dark px-3 py-2 shadow-sm">
                      <i className="bi bi-laptop me-2"></i> Web App
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                      <h4 className="fw-bold mb-2">{project.title}</h4>
                      {project.shortIntro && (
                        <p className="text-muted small mb-0">
                          <i className="bi bi-info-circle me-2"></i>
                          {project.shortIntro}
                        </p>
                      )}
                    </div>
                    <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                      <i className="bi bi-stars me-1"></i>
                      Featured
                    </span>
                  </div>

                  <p className="text-dark mb-4">{project.description}</p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3 d-flex align-items-center">
                        <i className="bi bi-tools text-primary me-2"></i>
                        Tech Stack
                      </h6>
                      <div className="d-flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, index) => (
                          <span key={index} className="badge bg-light text-dark border px-3 py-1">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="badge bg-light text-dark border px-3 py-1">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="d-flex justify-content-between align-items-center mt-4 pt-4 border-top">
                    <div className="d-flex gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm px-4"
                        >
                          <i className="bi bi-play-circle me-2"></i>
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-dark btn-sm px-4"
                        >
                          <i className="bi bi-github me-2"></i>
                          Code
                        </a>
                      )}
                    </div>
                    <button 
                      className="btn btn-link text-decoration-none text-dark btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#projectModal"
                    >
                      <i className="bi bi-arrow-right me-1"></i>
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="row mt-6">
          <div className="col-12">
            <div className="bg-white rounded-4 p-4 p-lg-5 shadow-sm">
              <div className="row text-center">
                <div className="col-md-3 mb-4 mb-md-0">
                  <div className="display-6 fw-bold text-primary mb-2">{projects.length}</div>
                  <div className="text-muted">Total Projects</div>
                </div>
                <div className="col-md-3 mb-4 mb-md-0">
                  <div className="display-6 fw-bold text-success mb-2">
                    {projects.filter(p => p.liveUrl).length}
                  </div>
                  <div className="text-muted">Live Demos</div>
                </div>
                <div className="col-md-3 mb-4 mb-md-0">
                  <div className="display-6 fw-bold text-warning mb-2">
                    {new Set(projects.flatMap(p => p.technologies || [])).size}
                  </div>
                  <div className="text-muted">Technologies</div>
                </div>
                <div className="col-md-3">
                  <div className="display-6 fw-bold text-info mb-2">
                    {projects.filter(p => p.githubUrl).length}
                  </div>
                  <div className="text-muted">Open Source</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Button */}
        {projects.length > 3 && (
          <div className="text-center mt-6">
            <button className="btn btn-primary px-5 py-3">
              <i className="bi bi-grid-3x3-gap me-2"></i>
              View All Projects
            </button>
            <p className="text-muted small mt-3">
              <i className="bi bi-mouse me-1"></i>
              Hover over project cards to explore interactive previews
            </p>
          </div>
        )}
      </div>

      {/* Inline CSS for smooth scrolling effect */}
      <style jsx>{`
        .project-image-container {
          cursor: pointer;
          position: relative;
          background: #f8f9fa;
        }
        
        .project-image {
          transition: transform 8s ease-in-out;
          will-change: transform;
        }
        
        .project-image-container:hover .project-image {
          transform: translateY(-70%);
        }
        
        .project-card {
          transition: all 0.4s ease;
        }
        
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1) !important;
        }
        
        .bg-gradient-dark {
          background: linear-gradient(to bottom, 
            rgba(0, 0, 0, 0.2) 0%, 
            rgba(0, 0, 0, 0) 30%,
            rgba(0, 0, 0, 0) 70%,
            rgba(0, 0, 0, 0.3) 100%);
          pointer-events: none;
        }
        
        .transition-opacity {
          transition: opacity 0.3s ease;
        }
        
        .rounded-top {
          border-top-left-radius: 0.5rem !important;
          border-top-right-radius: 0.5rem !important;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;