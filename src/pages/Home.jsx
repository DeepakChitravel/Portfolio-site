import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicProfile } from "../api/profile";
import { getPublicEducation } from "../api/api"; // Add this import
import "../styles/Home.css";

function Home() {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]); // Add education state
  const [loading, setLoading] = useState(true);
  const [eduLoading, setEduLoading] = useState(false); // Separate loading for education
  const navigate = useNavigate();

  useEffect(() => {
    // Load profile data
    getPublicProfile()
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    // Load education data
    setEduLoading(true);
    getPublicEducation()
      .then((data) => {
        console.log("EDUCATION DATA:", data);
        setEducation(data);
        setEduLoading(false);
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
            description: "Specialized in full-stack web development, machine learning, and software engineering principles.",
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
            description: "Intensive 6-month program covering modern web development technologies.",
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
            description: "Mastered advanced React patterns, performance optimization, and modern JavaScript features.",
            category: "course"
          }
        ];
        setEducation(sampleData);
        setEduLoading(false);
      });
  }, []);

  // Calculate education duration
  const calculateDuration = (startYear, endYear, current) => {
    if (current) return `${startYear} - Present`;
    const start = parseInt(startYear);
    const end = parseInt(endYear);
    const years = end - start;
    return `${startYear} - ${endYear}`;
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="error-screen">
        <div className="error-content">
          <h2>Unable to load profile</h2>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="professional-portfolio">
      {/* Header */}
      <header className="portfolio-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">{profile.name.split(' ')[0]}</span>
          </div>
          <nav className="header-nav">
            <a href="#skills">Skills</a>
            <a href="#education">Education</a> {/* Updated link */}
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href={`mailto:${profile.email}`} className="contact-btn">
            Get in Touch
          </a>
        </div>
      </header>

      {/* Hero Section - Minimal */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="availability-badge">
              <span className="dot"></span> Open to Opportunities
            </div>
            <h1>{profile.name}</h1>
            <h2 className="role-title">{profile.role}</h2>
            <p className="hero-description">
              {profile.shortIntro || "Full-stack developer with expertise in modern web technologies."}
            </p>
            <div className="hero-actions">
              <a
                href={profile.resume ? `http://localhost:5000${profile.resume}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-btn"
              >
                View Resume
              </a>

              <a href={`mailto:${profile.email}`} className="secondary-btn">
                Contact Me
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img src={profile.avatar} alt={profile.name} />
          </div>
        </div>
      </section>



      {/* Skills Section - Compact */}
<section id="skills" className="skills-section bg-white py-5">
  <div className="container">
    <div className="row mb-5">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="h1 fw-bold text-dark mb-2">Technical Skills</h2>
            <p className="text-muted mb-0">Core competencies and technologies</p>
          </div>
          <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
            {profile.skills?.length || 0} Skills
          </div>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-12">
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {profile.skills?.map((skill, index) => (
            <div 
              key={index} 
              className="d-flex align-items-center gap-2 px-4 py-3 bg-light rounded-pill"
            >
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}>
                <span className="fw-bold">{getSkillIcon(skill)}</span>
              </div>
              <span className="fw-medium text-dark">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {profile.skills?.length === 0 && (
      <div className="text-center py-5">
        <div className="display-1 text-muted mb-3 opacity-50">
          <i className="bi bi-tools"></i>
        </div>
        <h5 className="text-muted">No skills listed</h5>
      </div>
    )}
  </div>
</section>

      {/* Education Section - Added */}
<section id="education" className="education-section py-5 bg-light">
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="fw-bold">Education</h2>
      <p className="text-muted">Academic background and certifications</p>
    </div>

    {education.length === 0 ? (
      <div className="text-center py-5">
        <div className="fs-1">🎓</div>
        <p>No education details available</p>
      </div>
    ) : (
      <div className="timeline-wrapper">

        {education.map((edu, index) => (
          <div key={edu._id} className="timeline-item mb-5">

            {/* Timeline marker */}
            <div className="timeline-marker"></div>

            {/* Card */}
            <div className="timeline-card card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="fs-1 me-3">
                    {edu.category === "university"
                      ? "🎓"
                      : edu.category === "bootcamp"
                      ? "🚀"
                      : edu.category === "certification"
                      ? "📜"
                      : "📚"}
                  </div>

                  <div>
                    <h4 className="fw-bold mb-1">{edu.degree}</h4>
                    <p className="text-muted mb-0">{edu.institution}</p>
                  </div>
                </div>

                <ul className="list-unstyled small text-muted mb-3">
                  <li>📅 {calculateDuration(edu.startYear, edu.endYear, edu.current)}</li>
                  {edu.location && <li>📍 {edu.location}</li>}
                  {edu.grade && <li>📊 {edu.grade}</li>}
                </ul>

                {edu.description && (
                  <p className="text-dark">{edu.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}

      </div>
    )}

    {/* View All */}
    {education.length > 3 && (
      <div className="text-center mt-4">
        <button
          className="btn btn-outline-primary px-4"
          onClick={() => navigate("/education")}
        >
          View All Education ({education.length}) →
        </button>
      </div>
    )}
  </div>
</section>



      {/* Experience Summary */}
      <section id="experience" className="experience-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Professional Highlights</h2>
          </div>

          <div className="highlights-grid">
            <div className="highlight-card">
              <div className="highlight-icon">💼</div>
              <h3>Experience</h3>
              <p>2+ years in full-stack development, specializing in React, Node.js, and cloud technologies</p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">🎯</div>
              <h3>Expertise</h3>
              <p>Modern web applications, REST APIs, database design, and scalable architecture</p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">🚀</div>
              <h3>Delivery</h3>
              <p>15+ successful projects delivered on time with high client satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section - Updated */}
      <section className="certifications-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Certifications</h2>
            <p>Professional credentials and badges</p>
          </div>

          <div className="certifications-grid">
            <div className="certification-card">
              <div className="certification-icon">☁️</div>
              <div className="certification-content">
                <h3>AWS Certified Developer</h3>
                <p className="certification-issuer">Amazon Web Services</p>
                <p className="certification-desc">Cloud architecture and deployment</p>
              </div>
            </div>

            <div className="certification-card">
              <div className="certification-icon">⚛️</div>
              <div className="certification-content">
                <h3>React Professional</h3>
                <p className="certification-issuer">Meta Certification</p>
                <p className="certification-desc">Advanced React patterns</p>
              </div>
            </div>

            <div className="certification-card">
              <div className="certification-icon">🚀</div>
              <div className="certification-content">
                <h3>Full Stack Developer</h3>
                <p className="certification-issuer">Coding Academy</p>
                <p className="certification-desc">Full-stack web development</p>
              </div>
            </div>
          </div>

          <div className="view-all-container">
            <button
              className="view-all-btn"
              onClick={() => navigate('/certificates')}
            >
              View All Certificates →
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section - Simple */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <div className="contact-content">
            <h2>Ready to Connect?</h2>
            <p className="contact-subtitle">
              I'm currently available for full-time opportunities and freelance projects.
            </p>

            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-label">Email</div>
                <a href={`mailto:${profile.email}`} className="contact-value">
                  {profile.email}
                </a>
              </div>

              <div className="contact-item">
                <div className="contact-label">Location</div>
                <div className="contact-value">{profile.location}</div>
              </div>

              <div className="contact-item">
                <div className="contact-label">Status</div>
                <div className="contact-value">
                  <span className="status-badge">
                    <span className="status-dot"></span>
                    Open to Opportunities
                  </span>
                </div>
              </div>
            </div>

            <div className="contact-actions">
              <a href={`mailto:${profile.email}`} className="primary-btn large">
                Send Email
              </a>
              <a
                href={profile.resume ? `http://localhost:5000${profile.resume}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-btn large"
              >
                Download Resume
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="portfolio-footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">{profile.name.charAt(0)}</div>
            <div>
              <h3>{profile.name}</h3>
              <p>{profile.role}</p>
            </div>
          </div>

          <div className="footer-right">
            <div className="social-links">
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
              <a href="#">Twitter</a>
            </div>
            <p className="copyright">
              © {new Date().getFullYear()} {profile.name}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function getSkillIcon(skill) {
  const iconMap = {
    'JavaScript': 'JS',
    'React': 'R',
    'Node.js': 'N',
    'TypeScript': 'TS',
    'HTML5': 'H5',
    'CSS3': 'C3',
    'MongoDB': 'MDB',
    'Express': 'EX',
    'Next.js': 'NX',
    'MySQL': 'SQL',
    'Python': 'PY',
    'AWS': 'AWS',
    'Docker': 'DK',
    'Git': 'GT'
  };
  return iconMap[skill] || skill.charAt(0);
}

export default Home;