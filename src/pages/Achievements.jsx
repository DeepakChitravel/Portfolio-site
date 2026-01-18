import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicAchievements } from "../api/api";
import "../styles/Achievements.css";

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getPublicAchievements()
      .then((data) => {
        console.log("ACHIEVEMENTS:", data);
        setAchievements(data);
      })
      .catch((err) => {
        console.error("Achievements load error:", err);
        // For demo purposes, create sample data
        const sampleData = [
          {
            _id: "1",
            title: "Hackathon Winner - Tech Innovators 2023",
            category: "Competition",
            issuer: "Tech Innovators Inc.",
            date: "2023-10-15",
            description: "First place in national coding competition with over 500 participants. Developed an AI-powered productivity tool that impressed judges with its innovation and practicality.",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            impact: "Recognition from industry leaders and prize money of $10,000",
            skills: ["React", "Node.js", "AI/ML", "Team Leadership"],
            link: "https://hackathon.com/certificate/123",
            featured: true
          },
          {
            _id: "2",
            title: "Employee of the Year 2023",
            category: "Work Recognition",
            issuer: "TechCorp Solutions",
            date: "2023-12-20",
            description: "Recognized for outstanding contributions to key projects, exceptional teamwork, and consistently exceeding performance metrics throughout the year.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            impact: "Selected from 200+ employees for top performance award",
            skills: ["Project Management", "Team Collaboration", "Problem Solving"],
            link: null,
            featured: false
          },
          {
            _id: "3",
            title: "Open Source Contributor of the Month",
            category: "Community",
            issuer: "GitHub",
            date: "2023-08-05",
            description: "Contributed significant improvements to popular open-source React libraries, fixing critical bugs and adding new features used by thousands of developers.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            impact: "Code contributions merged into 3 major open-source projects",
            skills: ["React", "Git", "Open Source", "Code Review"],
            link: "https://github.com/contributions",
            featured: true
          },
          {
            _id: "4",
            title: "Best Technical Presentation Award",
            category: "Public Speaking",
            issuer: "DevCon 2023",
            date: "2023-05-20",
            description: "Award for best technical presentation at international developer conference. Presented innovative approach to microservices architecture.",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            impact: "Selected as best speaker among 50+ presenters",
            skills: ["Public Speaking", "Microservices", "Technical Writing"],
            link: "https://devcon.com/speakers/2023",
            featured: false
          },
          {
            _id: "5",
            title: "Mentorship Excellence Award",
            category: "Leadership",
            issuer: "Tech Education Foundation",
            date: "2023-03-10",
            description: "Recognized for outstanding mentorship of junior developers, helping 15+ engineers grow their skills and advance their careers.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            impact: "Mentored developers now lead their own projects",
            skills: ["Mentoring", "Leadership", "Team Development"],
            link: null,
            featured: true
          },
          {
            _id: "6",
            title: "Innovation Patent Filed",
            category: "Innovation",
            issuer: "Patent Office",
            date: "2023-01-15",
            description: "Filed patent for novel algorithm that improves database query performance by 300%. Currently in review process.",
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            impact: "Potential industry-wide impact on database performance",
            skills: ["Algorithms", "Database", "Research", "Innovation"],
            link: "https://patentoffice.gov/application/123",
            featured: true
          }
        ];
        setAchievements(sampleData);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleNavigation = (path) => {
    const mainContent = document.querySelector('.achievements-content');
    if (mainContent) {
      mainContent.style.opacity = '0.7';
      mainContent.style.transform = 'scale(0.98)';
    }
    
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  // Get unique categories
  const categories = ["all", ...new Set(achievements.map(a => a.category || "uncategorized"))];

  // Filter achievements
  const filteredAchievements = achievements.filter(achievement => {
    const matchesFilter = filter === "all" || achievement.category === filter;
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (achievement.skills && achievement.skills.some(skill => 
                           skill.toLowerCase().includes(searchTerm.toLowerCase())
                         ));
    return matchesFilter && matchesSearch;
  });

  // Separate featured achievements
  const featuredAchievements = filteredAchievements.filter(a => a.featured);
  const regularAchievements = filteredAchievements.filter(a => !a.featured);

  // Group by year
  const achievementsByYear = filteredAchievements.reduce((groups, achievement) => {
    const year = new Date(achievement.date).getFullYear();
    if (!groups[year]) groups[year] = [];
    groups[year].push(achievement);
    return groups;
  }, {});

  const sortedYears = Object.keys(achievementsByYear).sort((a, b) => b - a);

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
              <h2>Loading Achievements</h2>
              <p>Fetching your professional milestones...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🏆</div>
        <h2>No Achievements Yet</h2>
        <p>Professional achievements will appear here once added.</p>
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
            <div className="brand-logo">A</div>
            <span className="brand-text">Achievements</span>
          </div>
          
          <div className="nav-links">
            <button 
              className="nav-link"
              onClick={() => handleNavigation('/')}
            >
              Home
            </button>
            <button 
              className="nav-link"
              onClick={() => handleNavigation('/certificates')}
            >
              Certificates
            </button>
            <button 
              className="nav-link active"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
      <main className="achievements-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                Professional Milestones
              </div>
              
              <h1 className="hero-title">
                My <span className="highlight">Achievements</span>
              </h1>
              
              <p className="hero-subtitle">
                Recognitions, awards, and professional milestones demonstrating excellence and impact
              </p>
              
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">{achievements.length}</span>
                  <span className="stat-label">Total Achievements</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {featuredAchievements.length}
                  </span>
                  <span className="stat-label">Featured</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {new Set(achievements.map(a => a.category)).size}
                  </span>
                  <span className="stat-label">Categories</span>
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
                placeholder="Search achievements, skills, or categories..."
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
                <div className="summary-icon">⭐</div>
                <div className="summary-content">
                  <h3>Featured Achievements</h3>
                  <p>{featuredAchievements.length} standout accomplishments</p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">📅</div>
                <div className="summary-content">
                  <h3>Latest Achievement</h3>
                  <p>
                    {achievements.length > 0 
                      ? achievements.sort((a, b) => new Date(b.date) - new Date(a.date))[0].title
                      : 'None'
                    }
                  </p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">🎯</div>
                <div className="summary-content">
                  <h3>Skill Diversity</h3>
                  <p>
                    {new Set(achievements.flatMap(a => a.skills || [])).size} skills demonstrated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Achievements */}
        {featuredAchievements.length > 0 && (
          <section className="featured-section">
            <div className="section-container">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="title-number">⭐</span>
                  Featured Achievements
                </h2>
                <div className="section-line"></div>
                <span className="featured-count">
                  {featuredAchievements.length} featured
                </span>
              </div>
              
              <div className="featured-grid">
                {featuredAchievements.map((achievement) => (
                  <div key={achievement._id} className="achievement-card featured">
                    <div className="achievement-image-container">
                      {achievement.image ? (
                        <img 
                          src={achievement.image} 
                          alt={achievement.title}
                          className="achievement-image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="achievement-placeholder">
                          <span className="placeholder-icon">🏆</span>
                        </div>
                      )}
                      <span className="featured-badge">Featured</span>
                    </div>
                    
                    <div className="achievement-content">
                      <div className="achievement-header">
                        <h3 className="achievement-title">{achievement.title}</h3>
                        <span className="achievement-date">
                          {new Date(achievement.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                      
                      <div className="achievement-meta">
                        <div className="meta-item">
                          <span className="meta-icon">🏷️</span>
                          <span className="meta-text">{achievement.category}</span>
                        </div>
                        {achievement.issuer && (
                          <div className="meta-item">
                            <span className="meta-icon">🏛️</span>
                            <span className="meta-text">{achievement.issuer}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="achievement-description">{achievement.description}</p>
                      
                      {achievement.impact && (
                        <div className="achievement-impact">
                          <span className="impact-icon">💫</span>
                          <span className="impact-text">{achievement.impact}</span>
                        </div>
                      )}
                      
                      {achievement.skills && achievement.skills.length > 0 && (
                        <div className="achievement-skills">
                          <h4>Skills Demonstrated</h4>
                          <div className="skills-list">
                            {achievement.skills.map((skill, index) => (
                              <span key={index} className="skill-tag">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="achievement-actions">
                        {achievement.link && (
                          <a
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="verify-btn"
                          >
                            <span className="btn-icon">🔗</span>
                            View Proof
                          </a>
                        )}
                        <button 
                          className="details-btn"
                          onClick={() => {
                            alert(`Achievement Details:\n\n${achievement.title}\n${achievement.issuer ? `Issued by: ${achievement.issuer}\n` : ''}Date: ${achievement.date}\n\n${achievement.description}\n\n${achievement.impact ? `Impact: ${achievement.impact}` : ''}`);
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
          </section>
        )}

        {/* All Achievements by Year */}
        <section className="achievements-section">
          <div className="section-container">
            {sortedYears.map(year => (
              <div key={year} className="year-section">
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="title-number">{year}</span>
                    Achievements
                  </h2>
                  <div className="section-line"></div>
                  <span className="year-count">
                    {achievementsByYear[year].length} achievement{achievementsByYear[year].length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="achievements-grid">
                  {achievementsByYear[year]
                    .filter(a => !a.featured || featuredAchievements.length === 0)
                    .map((achievement) => (
                    <div key={achievement._id} className="achievement-card">
                      <div className="achievement-content">
                        <div className="achievement-header">
                          <h3 className="achievement-title">{achievement.title}</h3>
                          <span className="achievement-date">
                            {new Date(achievement.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        
                        <div className="achievement-meta">
                          <div className="meta-item">
                            <span className="meta-icon">🏷️</span>
                            <span className="meta-text">{achievement.category}</span>
                          </div>
                          {achievement.issuer && (
                            <div className="meta-item">
                              <span className="meta-icon">🏛️</span>
                              <span className="meta-text">{achievement.issuer}</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="achievement-description">{achievement.description}</p>
                        
                        {achievement.image && (
                          <div className="achievement-image-preview">
                            <img 
                              src={achievement.image} 
                              alt={achievement.title}
                              className="preview-image"
                              loading="lazy"
                            />
                          </div>
                        )}
                        
                        {achievement.impact && (
                          <div className="achievement-impact">
                            <span className="impact-icon">💫</span>
                            <span className="impact-text">{achievement.impact}</span>
                          </div>
                        )}
                        
                        {achievement.skills && achievement.skills.length > 0 && (
                          <div className="achievement-skills">
                            <div className="skills-list">
                              {achievement.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="achievement-actions">
                          {achievement.link && (
                            <a
                              href={achievement.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="verify-btn small"
                            >
                              <span className="btn-icon">🔗</span>
                              View Proof
                            </a>
                          )}
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
              <h3 className="cta-title">More Achievements to Come</h3>
              <p className="cta-text">
                These achievements represent my professional journey so far. I'm continuously working on new projects and challenges.
              </p>
              <div className="cta-actions">
                <button 
                  className="btn-primary large"
                  onClick={() => handleNavigation('/certificates')}
                >
                  <span className="btn-icon">📜</span>
                  View Certificates
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
              <div className="footer-logo">A</div>
              <div className="footer-info">
                <h3>Professional Achievements</h3>
                <p>{achievements.length} milestones achieved</p>
              </div>
            </div>
            
            <div className="footer-links">
              <button className="footer-link" onClick={() => handleNavigation('/')}>
                Home
              </button>
              <button className="footer-link" onClick={() => handleNavigation('/certificates')}>
                Certificates
              </button>
              <button className="footer-link" onClick={() => handleNavigation('/education')}>
                Education
              </button>
            </div>
            
            <div className="footer-actions">
              <button className="footer-btn" onClick={() => window.print()}>
                Print Achievements
              </button>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Professional Portfolio. All rights reserved.</p>
            <p className="footer-note">{achievements.length} Professional Achievements</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Achievements;