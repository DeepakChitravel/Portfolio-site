import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const TechnicalSkills = ({ profile }) => {
  if (!profile) return null;

  // Optional: Group skills by category if your data structure supports it
  const categorizeSkills = (skills) => {
    // You can modify this based on your actual skill categorization logic
    const categories = {
      'Frontend': [],
      'Backend': [],
      'Database': [],
      'Tools & Others': []
    };
    
    skills?.forEach(skill => {
      // Add categorization logic here based on skill names
      // Example logic (customize as needed):
      if (['React', 'Vue', 'Angular', 'HTML', 'CSS', 'JavaScript', 'TypeScript'].includes(skill))
        categories['Frontend'].push(skill);
      else if (['Node.js', 'Python', 'Java', 'PHP', 'Ruby'].includes(skill))
        categories['Backend'].push(skill);
      else if (['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'].includes(skill))
        categories['Database'].push(skill);
      else
        categories['Tools & Others'].push(skill);
    });
    
    return Object.entries(categories).filter(([_, skills]) => skills.length > 0);
  };

  const skillCategories = categorizeSkills(profile.skills);

  return (
    <section id="skills" className="py-4 py-md-5 bg-light">
      <Container>
        {/* Section Header */}
        <Row className="mb-4 mb-md-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-6 display-md-5 fw-bold mb-3">Technical Skills</h2>
            <p className="lead text-muted mb-4 px-3">
              Technologies and tools I work with
            </p>
            <div className="bg-primary mx-auto mb-4" 
                 style={{ width: '50px', height: '3px', borderRadius: '2px' }}></div>
          </Col>
        </Row>

        {/* Skills Display */}
        {profile.skills && profile.skills.length > 0 ? (
          <>
            {/* Option 1: Simple responsive grid layout (Recommended) */}
            <Row className="justify-content-center">
              <Col xs={12} lg={10}>
                <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3">
                  {profile.skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="skill-pill d-flex align-items-center px-3 px-md-4 py-2 py-md-3 bg-white rounded-pill border shadow-sm"
                      style={{
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                      }}
                    >
                      <span className="fw-medium text-dark fs-6 fs-md-5">{skill}</span>
                      <span className="badge bg-primary ms-2 px-2 py-1 rounded-circle" 
                            style={{ fontSize: '0.75rem' }}>
                        {skill.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Skills Count - Mobile Optimized */}
                <div className="text-center mt-4 mt-md-5">
                  <div className="bg-white d-inline-flex px-3 px-md-4 py-2 rounded-pill border shadow-sm">
                    <span className="text-muted me-2" style={{ fontSize: '0.875rem' }}>
                      Total Skills:
                    </span>
                    <span className="fw-bold text-primary">{profile.skills.length}</span>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Option 2: Category-based responsive grid (Uncomment if you have categories) */}
            {/*
            <Row className="g-3 g-md-4">
              {skillCategories.map(([category, skills], catIndex) => (
                <Col xs={12} md={6} key={catIndex}>
                  <div className="h-100 bg-white rounded-4 p-3 p-md-4 border shadow-sm">
                    <h4 className="h5 fw-bold mb-3 pb-2 border-bottom">
                      {category}
                    </h4>
                    <div className="d-flex flex-wrap gap-2">
                      {skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag px-3 py-2 bg-light rounded-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            */}
          </>
        ) : (
          <Row>
            <Col xs={12}>
              <div className="text-center py-4 py-md-5">
                <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm mx-3 mx-md-0">
                  <div className="text-muted mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16">
                      <path d="M1 0L0 1l2.5 3.5L.5 6v1h4v4l2.5-2.5L12 14l1-1-6.5-6.5L9 3.5 8.5 2l-3 1.5L1 0z"/>
                      <path d="M14.5 7.5l-4 4L13 14l4-4-2.5-2.5z"/>
                    </svg>
                  </div>
                  <h4 className="fw-bold mb-2">No skills available</h4>
                  <p className="text-muted mb-0">
                    Technical skills will be added soon
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>

      {/* Add custom CSS for responsive behavior */}
      <style jsx>{`
        @media (max-width: 576px) {
          .skill-pill {
            font-size: 0.875rem;
            min-width: auto;
            flex: 0 1 auto;
          }
          
          .skill-pill .badge {
            font-size: 0.7rem;
            padding: 0.25rem 0.5rem;
          }
        }
        
        @media (min-width: 768px) {
          .skill-pill {
            min-width: 120px;
            justify-content: center;
          }
        }
        
        /* Optional: Add smooth animation for skill pills */
        .skill-pill {
          animation: fadeInUp 0.5s ease-out;
          animation-fill-mode: both;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Stagger animation for each skill */
        .skill-pill:nth-child(n) {
          animation-delay: calc(0.05s * var(--index, 0));
        }
      `}</style>
    </section>
  );
};

// Optional: Add CSS class for skill tags if using category view
const styles = `
  .skill-tag {
    transition: all 0.2s ease;
    font-size: 0.875rem;
    border: 1px solid #dee2e6;
  }
  
  .skill-tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-color: #0d6efd;
    color: #0d6efd;
  }
  
  @media (max-width: 576px) {
    .skill-tag {
      font-size: 0.75rem;
      padding: 0.5rem 0.75rem;
    }
  }
`;

export default TechnicalSkills;