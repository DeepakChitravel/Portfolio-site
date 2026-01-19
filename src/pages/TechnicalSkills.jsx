import React from 'react';

const TechnicalSkills = ({ profile }) => {
  if (!profile) return null;

  return (
    <section id="skills" className="py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="fw-bold mb-3">Technical Skills</h2>
            <p className="text-muted mb-4">Technologies and tools I work with</p>
          </div>
        </div>

        {profile.skills && profile.skills.length > 0 ? (
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {profile.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="d-flex align-items-center px-4 py-2 bg-light rounded-pill border"
                  >
                    <span className="fw-medium">{skill}</span>
                    <span className="badge bg-primary ms-2">
                      {skill.charAt(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12 text-center py-4">
              <p className="text-muted">No skills available</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TechnicalSkills;