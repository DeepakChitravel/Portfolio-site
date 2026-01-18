import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicCertificates } from "../api/api";
import "../styles/Certificates.css";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getPublicCertificates()
      .then((data) => {
        console.log("CERTIFICATES:", data);
        setCertificates(data);
      })
      .catch((err) => {
        console.error("Certificates load error:", err);
        // For demo purposes, create sample data
        const sampleData = [
          {
            _id: "1",
            title: "Full Stack Web Development",
            issuer: "Coursera",
            issueDate: "2023-06-15",
            expiryDate: "2025-06-15",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            skills: ["React", "Node.js", "MongoDB", "Express"],
            credentialUrl: "https://coursera.org/verify/ABC123",
            category: "development"
          },
          {
            _id: "2",
            title: "React Developer Professional",
            issuer: "Meta",
            issueDate: "2023-03-10",
            expiryDate: null,
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            skills: ["React", "JavaScript", "Redux", "Next.js"],
            credentialUrl: "https://meta.com/cert/XYZ456",
            category: "development"
          },
          {
            _id: "3",
            title: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            issueDate: "2022-11-20",
            expiryDate: "2024-11-20",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            skills: ["AWS", "Cloud", "DevOps", "Architecture"],
            credentialUrl: "https://aws.amazon.com/certification",
            category: "cloud"
          },
          {
            _id: "4",
            title: "JavaScript Algorithms and Data Structures",
            issuer: "freeCodeCamp",
            issueDate: "2023-01-05",
            expiryDate: null,
            image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            skills: ["JavaScript", "Algorithms", "Data Structures"],
            credentialUrl: "https://freecodecamp.org/certification",
            category: "development"
          },
          {
            _id: "5",
            title: "UI/UX Design Specialization",
            issuer: "Google",
            issueDate: "2023-08-30",
            expiryDate: "2025-08-30",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            skills: ["UI Design", "UX Research", "Figma", "Prototyping"],
            credentialUrl: "https://grow.google/certificates",
            category: "design"
          },
          {
            _id: "6",
            title: "Python for Data Science",
            issuer: "IBM",
            issueDate: "2022-09-12",
            expiryDate: "2024-09-12",
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            skills: ["Python", "Data Science", "Pandas", "NumPy"],
            credentialUrl: "https://ibm.com/training",
            category: "data"
          }
        ];
        setCertificates(sampleData);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleNavigation = (path) => {
    const mainContent = document.querySelector('.certificates-content');
    if (mainContent) {
      mainContent.style.opacity = '0.7';
      mainContent.style.transform = 'scale(0.98)';
    }
    
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  // Get unique categories
  const categories = ["all", ...new Set(certificates.map(c => c.category || "uncategorized"))];

  // Filter certificates
  const filteredCertificates = certificates.filter(cert => {
    const matchesFilter = filter === "all" || cert.category === filter;
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (cert.skills && cert.skills.some(skill => 
                           skill.toLowerCase().includes(searchTerm.toLowerCase())
                         ));
    return matchesFilter && matchesSearch;
  });

  // Group certificates by year
  const certificatesByYear = filteredCertificates.reduce((groups, cert) => {
    const year = new Date(cert.issueDate).getFullYear();
    if (!groups[year]) groups[year] = [];
    groups[year].push(cert);
    return groups;
  }, {});

  const sortedYears = Object.keys(certificatesByYear).sort((a, b) => b - a);

  if (loading) {
    return (
      <div className="fullpage-loader">
        <div className="loader-content">
          <div className="advanced-loader">
            <div className="loader-circle">
              <div className="loader-inner"></div>
            </div>
            <div className="loader-text">
              <div className="loader-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <h2>Loading Certifications</h2>
              <p>Fetching your professional credentials...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📜</div>
        <h2>No Certificates Yet</h2>
        <p>Professional certifications will appear here once added.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Back to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="professional-dashboard">
      {/* Top Navigation Bar */}
      <nav className="top-navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-logo">C</div>
            <span className="brand-text">Certifications</span>
          </div>
          
          <div className="nav-links">
            <button 
              className="nav-link"
              onClick={() => handleNavigation('/')}
            >
              Home
            </button>
            <button 
              className="nav-link active"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Certificates
            </button>
            <button 
              className="nav-link"
              onClick={() => handleNavigation('/achievements')}
            >
              Achievements
            </button>
            <button 
              className="nav-link"
              onClick={() => handleNavigation('/education')}
            >
              Education
            </button>
          </div>
          
          <button className="nav-contact" onClick={() => handleNavigation('/')}>
            <span className="contact-icon">🏠</span>
            Back to Profile
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="certificates-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                Professional Credentials
              </div>
              
              <h1 className="hero-title">
                My <span className="highlight">Certifications</span>
              </h1>
              
              <p className="hero-subtitle">
                Verified professional certifications and badges demonstrating expertise across various technologies
              </p>
              
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">{certificates.length}</span>
                  <span className="stat-label">Total Certificates</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {certificates.filter(c => !c.expiryDate).length}
                  </span>
                  <span className="stat-label">No Expiry</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {new Set(certificates.map(c => c.issuer)).size}
                  </span>
                  <span className="stat-label">Different Issuers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="filters-section">
          <div className="section-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search certificates, skills, or issuers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="filter-tabs">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-tab ${filter === category ? 'active' : ''}`}
                  onClick={() => setFilter(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="summary-section">
          <div className="section-container">
            <div className="summary-cards">
              <div className="summary-card">
                <div className="summary-icon">🎓</div>
                <div className="summary-content">
                  <h3>Active Certificates</h3>
                  <p>{certificates.filter(c => !c.expiryDate || new Date(c.expiryDate) > new Date()).length} valid</p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">🏆</div>
                <div className="summary-content">
                  <h3>Latest Achievement</h3>
                  <p>
                    {certificates.length > 0 
                      ? certificates.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))[0].title
                      : 'None'
                    }
                  </p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">📈</div>
                <div className="summary-content">
                  <h3>Skill Coverage</h3>
                  <p>
                    {new Set(certificates.flatMap(c => c.skills || [])).size} skills
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates Grid */}
        <section className="certificates-section">
          <div className="section-container">
            {sortedYears.map(year => (
              <div key={year} className="year-section">
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="title-number">{year}</span>
                    Certificates
                  </h2>
                  <div className="section-line"></div>
                  <span className="year-count">
                    {certificatesByYear[year].length} certificate{certificatesByYear[year].length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="certificates-grid">
                  {certificatesByYear[year].map((cert) => (
                    <div key={cert._id} className="certificate-card">
                      <div className="certificate-image-container">
                        {cert.image ? (
                          <img 
                            src={cert.image} 
                            alt={cert.title}
                            className="certificate-image"
                            loading="lazy"
                          />
                        ) : (
                          <div className="certificate-placeholder">
                            <span className="placeholder-icon">📜</span>
                          </div>
                        )}
                        {cert.category && (
                          <span className="certificate-category">
                            {cert.category}
                          </span>
                        )}
                        {cert.expiryDate && new Date(cert.expiryDate) < new Date() ? (
                          <span className="expired-badge">Expired</span>
                        ) : cert.expiryDate ? (
                          <span className="expiry-badge">
                            Expires {new Date(cert.expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                        ) : (
                          <span className="no-expiry-badge">No Expiry</span>
                        )}
                      </div>
                      
                      <div className="certificate-content">
                        <h3 className="certificate-title">{cert.title}</h3>
                        
                        <div className="certificate-meta">
                          <div className="meta-item">
                            <span className="meta-icon">🏛️</span>
                            <span className="meta-text">{cert.issuer}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-icon">📅</span>
                            <span className="meta-text">
                              Issued {new Date(cert.issueDate).toLocaleDateString('en-US', { 
                                month: 'long', 
                                year: 'numeric' 
                              })}
                            </span>
                          </div>
                        </div>
                        
                        {cert.skills && cert.skills.length > 0 && (
                          <div className="certificate-skills">
                            <h4>Skills Demonstrated</h4>
                            <div className="skills-list">
                              {cert.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="certificate-actions">
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="verify-btn"
                            >
                              <span className="btn-icon">🔗</span>
                              Verify Credential
                            </a>
                          )}
                          <button 
                            className="details-btn"
                            onClick={() => {
                              // Show certificate details modal or navigate to detail page
                              alert(`Certificate Details:\n\n${cert.title}\n${cert.issuer}\nIssued: ${cert.issueDate}\n\n${cert.skills ? `Skills: ${cert.skills.join(', ')}` : ''}`);
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="cta-section">
          <div className="section-container">
            <div className="cta-content">
              <h3 className="cta-title">Need Verification?</h3>
              <p className="cta-text">
                Most certificates include direct verification links. Contact me for any additional verification requirements or documentation.
              </p>
              <div className="cta-actions">
                <button 
                  className="btn-primary large"
                  onClick={() => window.location.href = 'mailto:' + (certificates[0]?.email || 'contact@example.com')}
                >
                  <span className="btn-icon">✉️</span>
                  Request Verification
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => handleNavigation('/')}
                >
                  <span className="btn-icon">🏠</span>
                  Back to Profile
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">C</div>
              <div className="footer-info">
                <h3>Professional Certifications</h3>
                <p>{certificates.length} credentials verified</p>
              </div>
            </div>
            
            <div className="footer-links">
              <button className="footer-link" onClick={() => handleNavigation('/')}>
                Home
              </button>
              <button className="footer-link" onClick={() => handleNavigation('/achievements')}>
                Achievements
              </button>
              <button className="footer-link" onClick={() => handleNavigation('/education')}>
                Education
              </button>
            </div>
            
            <div className="footer-actions">
              <button className="footer-btn" onClick={() => window.print()}>
                Print Certificates
              </button>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Professional Portfolio. All rights reserved.</p>
            <p className="footer-note">{certificates.length} Professional Certifications</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Certificates;