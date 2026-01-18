import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicEducation } from "../api/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getPublicEducation()
      .then((data) => {
        console.log("EDUCATION DATA:", data);
        setEducation(data);
      })
      .catch((err) => {
        console.error("Education fetch error:", err);
        // For demo purposes, create sample data
        const sampleData = [
          {
            _id: "1",
            degree: "Bachelor of Technology in Computer Science",
            institution: "University of Technology",
            fieldOfStudy: "Computer Science & Engineering",
            startYear: "2019",
            endYear: "2023",
            current: false,
            location: "Chennai, Tamil Nadu",
            grade: "8.9 CGPA",
            description: "Specialized in full-stack web development, machine learning, and software engineering principles. Completed multiple projects including an AI-powered recommendation system and a full-stack e-commerce platform.",
            activities: "Student Council Head, Hackathon Organizer, Open Source Club President",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            category: "university"
          },
          {
            _id: "2",
            degree: "Full Stack Web Development Bootcamp",
            institution: "Coding Academy",
            fieldOfStudy: "Full Stack Development",
            startYear: "2022",
            endYear: "2022",
            current: false,
            location: "Online",
            grade: "Completed with Excellence",
            description: "Intensive 6-month program covering modern web development technologies including React, Node.js, MongoDB, and DevOps. Built 5+ full-stack applications.",
            activities: "Capstone Project Lead, Peer Mentor",
            image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            category: "bootcamp"
          },
          {
            _id: "3",
            degree: "Advanced JavaScript and React Mastery",
            institution: "Frontend Masters",
            fieldOfStudy: "Frontend Development",
            startYear: "2023",
            endYear: "2023",
            current: false,
            location: "Online",
            grade: "Completed",
            description: "Mastered advanced React patterns, performance optimization, and modern JavaScript features. Learned state management with Redux and testing with Jest.",
            activities: "Top Performer in Advanced Concepts",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            category: "course"
          },
          {
            _id: "4",
            degree: "Cloud Computing Fundamentals",
            institution: "AWS Training",
            fieldOfStudy: "Cloud Technology",
            startYear: "2023",
            endYear: "2023",
            current: false,
            location: "Online",
            grade: "Certified",
            description: "Learned cloud architecture, deployment strategies, and AWS services including EC2, S3, Lambda, and RDS. Implemented scalable cloud solutions.",
            activities: "Hands-on Labs, Project Deployment",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            category: "certification"
          },
          {
            _id: "5",
            degree: "Machine Learning Specialization",
            institution: "Coursera",
            fieldOfStudy: "Artificial Intelligence",
            startYear: "2023",
            endYear: "2023",
            current: false,
            location: "Online",
            grade: "95% Completion",
            description: "Gained expertise in machine learning algorithms, neural networks, and data preprocessing. Built predictive models using Python and TensorFlow.",
            activities: "ML Project Leader, Kaggle Competitions",
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            category: "course"
          },
          {
            _id: "6",
            degree: "Data Structures & Algorithms",
            institution: "LeetCode Academy",
            fieldOfStudy: "Computer Science Fundamentals",
            startYear: "2022",
            endYear: "2023",
            current: true,
            location: "Online",
            grade: "Top 10% Ranking",
            description: "Mastered problem-solving techniques, algorithm optimization, and data structure implementation. Solved 300+ coding problems.",
            activities: "Daily Problem Solving, Competitive Programming",
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            category: "course"
          }
        ];
        setEducation(sampleData);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Get unique categories
  const categories = ["all", ...new Set(education.map(edu => edu.category || "uncategorized"))];

  // Filter education
  const filteredEducation = education.filter(edu => {
    const matchesFilter = filter === "all" || edu.category === filter;
    const matchesSearch = edu.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         edu.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         edu.fieldOfStudy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         edu.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate education duration
  const calculateDuration = (startYear, endYear, current) => {
    if (current) return `${startYear} - Present`;
    const start = parseInt(startYear);
    const end = parseInt(endYear);
    const years = end - start;
    return `${startYear} - ${endYear} (${years} year${years !== 1 ? 's' : ''})`;
  };

  // Get category badge class
  const getCategoryClass = (category) => {
    switch(category) {
      case 'university': return 'bg-primary';
      case 'bootcamp': return 'bg-success';
      case 'course': return 'bg-info';
      case 'certification': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'university': return 'bi-mortarboard-fill';
      case 'bootcamp': return 'bi-laptop-fill';
      case 'course': return 'bi-book-fill';
      case 'certification': return 'bi-award-fill';
      default: return 'bi-patch-question-fill';
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="text-muted">Loading Education...</h4>
      </div>
    );
  }

  if (education.length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
        <div className="display-1 mb-3">🎓</div>
        <h2 className="mb-3">No Education Details</h2>
        <p className="text-muted mb-4">Education background will appear here once added.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          <i className="bi bi-house-door me-2"></i>
          Back to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '36px', height: '36px'}}>
              <i className="bi bi-mortarboard"></i>
            </div>
            <span className="fw-bold">Education</span>
          </a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => navigate('/')}>
                  <i className="bi bi-house me-1"></i>
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => navigate('/certificates')}>
                  <i className="bi bi-file-earmark-text me-1"></i>
                  Certificates
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => navigate('/achievements')}>
                  <i className="bi bi-trophy me-1"></i>
                  Achievements
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link active fw-bold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <i className="bi bi-mortarboard me-1"></i>
                  Education
                </button>
              </li>
            </ul>
            <button className="btn btn-outline-primary ms-lg-3 mt-2 mt-lg-0" onClick={() => navigate('/')}>
              <i className="bi bi-arrow-left me-1"></i>
              Back to Profile
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="d-flex align-items-center mb-3">
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 me-3">
                  <i className="bi bi-check-circle-fill me-1"></i>
                  Academic Journey
                </span>
              </div>
              <h1 className="display-5 fw-bold mb-3">
                My <span className="text-primary">Education</span>
              </h1>
              <p className="lead text-muted mb-4">
                Academic qualifications, courses, and continuous learning that form the foundation of my expertise
              </p>
              
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="text-center p-3 bg-light rounded">
                    <div className="h3 fw-bold text-primary mb-1">{education.length}</div>
                    <div className="text-muted small">Total Programs</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-3 bg-light rounded">
                    <div className="h3 fw-bold text-success mb-1">{education.filter(e => e.current).length}</div>
                    <div className="text-muted small">Ongoing</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-3 bg-light rounded">
                    <div className="h3 fw-bold text-info mb-1">{new Set(education.map(e => e.category)).size}</div>
                    <div className="text-muted small">Categories</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-4 mt-lg-0">
              <div className="card border-0 shadow">
                <div className="card-body text-center p-4">
                  <div className="display-1 text-primary mb-3">
                    <i className="bi bi-mortarboard"></i>
                  </div>
                  <h5 className="card-title">Lifelong Learner</h5>
                  <p className="card-text text-muted small">
                    Committed to continuous education and professional development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search & Filter Section */}
      <section className="py-4 bg-white border-bottom">
        <div className="container">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search degrees, institutions, or fields of study..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== "all").map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="d-flex flex-wrap gap-2 mt-3">
            {categories.map(category => (
              <button
                key={category}
                className={`btn btn-sm ${filter === category ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <main className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3 fw-bold">
              <i className="bi bi-journal-bookmark-fill text-primary me-2"></i>
              Education Timeline
            </h2>
            <span className="badge bg-light text-dark">
              {filteredEducation.length} of {education.length} programs
            </span>
          </div>

          {/* Education Cards */}
          <div className="row g-4">
            {filteredEducation.map((edu) => (
              <div key={edu._id} className="col-lg-6">
                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <span className={`badge ${getCategoryClass(edu.category)} mb-2`}>
                          <i className={`bi ${getCategoryIcon(edu.category)} me-1`}></i>
                          {edu.category.charAt(0).toUpperCase() + edu.category.slice(1)}
                        </span>
                        {edu.current && (
                          <span className="badge bg-success ms-2">
                            <i className="bi bi-clock-history me-1"></i>
                            Ongoing
                          </span>
                        )}
                      </div>
                      <span className="text-muted small">
                        <i className="bi bi-calendar me-1"></i>
                        {calculateDuration(edu.startYear, edu.endYear, edu.current)}
                      </span>
                    </div>
                    
                    <h3 className="h5 fw-bold mb-2">{edu.degree}</h3>
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-building text-primary me-2"></i>
                      <span className="fw-medium">{edu.institution}</span>
                    </div>
                    
                    {edu.fieldOfStudy && (
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-book text-muted me-2"></i>
                        <span className="text-muted">{edu.fieldOfStudy}</span>
                      </div>
                    )}
                    
                    {edu.location && (
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-geo-alt text-muted me-2"></i>
                        <span className="text-muted">{edu.location}</span>
                      </div>
                    )}
                    
                    {edu.grade && (
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-graph-up text-success me-2"></i>
                        <span className="fw-medium text-success">{edu.grade}</span>
                      </div>
                    )}
                    
                    {edu.description && (
                      <p className="text-muted mb-3">{edu.description}</p>
                    )}
                    
                    {edu.activities && (
                      <div className="mb-3">
                        <h6 className="fw-bold mb-2">
                          <i className="bi bi-activity me-1"></i>
                          Activities & Involvement
                        </h6>
                        <p className="text-muted small mb-0">{edu.activities}</p>
                      </div>
                    )}
                    
                    {/* Skills Learned */}
                    <div className="mb-3">
                      <h6 className="fw-bold mb-2">
                        <i className="bi bi-lightbulb me-1"></i>
                        Key Learnings
                      </h6>
                      <div className="d-flex flex-wrap gap-2">
                        {edu.category === "university" && (
                          <>
                            <span className="badge bg-light text-dark">Web Development</span>
                            <span className="badge bg-light text-dark">Machine Learning</span>
                            <span className="badge bg-light text-dark">Software Engineering</span>
                            <span className="badge bg-light text-dark">Algorithms</span>
                          </>
                        )}
                        {edu.category === "bootcamp" && (
                          <>
                            <span className="badge bg-light text-dark">React</span>
                            <span className="badge bg-light text-dark">Node.js</span>
                            <span className="badge bg-light text-dark">MongoDB</span>
                            <span className="badge bg-light text-dark">DevOps</span>
                          </>
                        )}
                        {edu.category === "course" && edu.fieldOfStudy?.includes("JavaScript") && (
                          <>
                            <span className="badge bg-light text-dark">JavaScript</span>
                            <span className="badge bg-light text-dark">React</span>
                            <span className="badge bg-light text-dark">Redux</span>
                            <span className="badge bg-light text-dark">Testing</span>
                          </>
                        )}
                        {edu.category === "certification" && (
                          <>
                            <span className="badge bg-light text-dark">Cloud Computing</span>
                            <span className="badge bg-light text-dark">AWS</span>
                            <span className="badge bg-light text-dark">Deployment</span>
                            <span className="badge bg-light text-dark">Architecture</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Image */}
                    {edu.image && (
                      <div className="mt-3">
                        <img 
                          src={edu.image} 
                          alt={edu.institution}
                          className="img-fluid rounded"
                          style={{maxHeight: '200px', objectFit: 'cover', width: '100%'}}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredEducation.length === 0 && (
            <div className="text-center py-5">
              <div className="display-1 text-muted mb-3">
                <i className="bi bi-search"></i>
              </div>
              <h4 className="mb-3">No results found</h4>
              <p className="text-muted mb-4">Try adjusting your search or filter criteria</p>
              <button 
                className="btn btn-outline-primary"
                onClick={() => {
                  setFilter("all");
                  setSearchTerm("");
                }}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Stats Section */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <h3 className="h4 fw-bold mb-4 text-center">Education Summary</h3>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="display-6 text-primary mb-3">
                    <i className="bi bi-mortarboard"></i>
                  </div>
                  <h5 className="card-title">Highest Degree</h5>
                  <p className="card-text text-muted">
                    {education.filter(e => e.category === "university").length > 0
                      ? education.filter(e => e.category === "university")
                          .sort((a, b) => new Date(b.endYear) - new Date(a.endYear))[0]?.degree
                      : 'Not specified'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="display-6 text-success mb-3">
                    <i className="bi bi-clock-history"></i>
                  </div>
                  <h5 className="card-title">Total Study Duration</h5>
                  <p className="card-text text-muted">
                    {education.reduce((total, edu) => {
                      if (edu.current) return total + (new Date().getFullYear() - parseInt(edu.startYear));
                      return total + (parseInt(edu.endYear) - parseInt(edu.startYear));
                    }, 0)} years
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="display-6 text-info mb-3">
                    <i className="bi bi-graph-up"></i>
                  </div>
                  <h5 className="card-title">Latest Achievement</h5>
                  <p className="card-text text-muted">
                    {education.filter(e => e.grade).length > 0
                      ? education.filter(e => e.grade)
                          .sort((a, b) => new Date(b.endYear) - new Date(a.endYear))[0]?.grade
                      : 'Continuing education'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary bg-opacity-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="display-5 text-primary mb-3">
                <i className="bi bi-lightbulb"></i>
              </div>
              <h3 className="h2 fw-bold mb-3">Lifelong Learning</h3>
              <p className="lead text-muted mb-4">
                Education is an ongoing journey. I'm committed to continuous learning and staying updated 
                with the latest technologies and methodologies in the industry.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <button 
                  className="btn btn-primary px-4"
                  onClick={() => navigate('/certificates')}
                >
                  <i className="bi bi-file-earmark-text me-2"></i>
                  View Certificates
                </button>
                <button 
                  className="btn btn-outline-primary px-4"
                  onClick={() => navigate('/achievements')}
                >
                  <i className="bi bi-trophy me-2"></i>
                  View Achievements
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                  <i className="bi bi-mortarboard"></i>
                </div>
                <div>
                  <h5 className="mb-0">Academic Background</h5>
                  <p className="text-muted mb-0">{education.length} educational programs</p>
                </div>
              </div>
              <p className="text-muted small">Continuous Learning & Development</p>
            </div>
            
            <div className="col-md-6 text-md-end">
              <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3 mb-3">
                <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/')}>
                  <i className="bi bi-house me-1"></i>
                  Home
                </button>
                <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/certificates')}>
                  <i className="bi bi-file-earmark-text me-1"></i>
                  Certificates
                </button>
                <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/achievements')}>
                  <i className="bi bi-trophy me-1"></i>
                  Achievements
                </button>
              </div>
              <div>
                <button className="btn btn-light btn-sm me-2" onClick={() => window.print()}>
                  <i className="bi bi-printer me-1"></i>
                  Print Education
                </button>
              </div>
            </div>
          </div>
          
          <hr className="border-secondary my-4" />
          
          <div className="text-center text-muted">
            <p className="mb-0">
              © {new Date().getFullYear()} Professional Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Education;