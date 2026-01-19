import React from 'react';
import { useNavigate } from 'react-router-dom';

const Education = ({ education, loading }) => {
  const navigate = useNavigate();

  const calculateDuration = (startYear, endYear, current) => {
    if (current) return `${startYear} - Present`;
    return `${startYear} - ${endYear}`;
  };

  if (loading) {
    return (
      <section id="education" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Education</h2>
            <p className="text-muted">Academic background and certifications</p>
          </div>
          <div className="row">
            {[1, 2, 3].map((i) => (
              <div key={i} className="col-12 mb-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="placeholder-glow">
                      <h5 className="placeholder col-8 mb-3"></h5>
                      <p className="placeholder col-6 mb-2"></p>
                      <p className="placeholder col-10"></p>
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

  if (!education || education.length === 0) {
    return (
      <section id="education" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Education</h2>
            <p className="text-muted">Academic background and certifications</p>
          </div>
          <div className="text-center py-5">
            <div className="display-1 text-muted mb-4">
              <i className="bi bi-mortarboard"></i>
            </div>
            <h4 className="fw-bold mb-3">No Education Listed</h4>
            <p className="text-muted mb-4">
              Educational background will appear here once added.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Education</h2>
          <p className="text-muted">Academic background and certifications</p>
        </div>

        {/* Simple Vertical Timeline */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {education.map((edu, index) => (
              <div key={edu._id} className="position-relative mb-4">
                {/* Timeline Line */}
                {index < education.length - 1 && (
                  <div className="position-absolute top-0 start-0 h-100 ps-4" style={{zIndex: 1}}>
                    <div className="border-start border-2 border-primary h-100 ms-2"></div>
                  </div>
                )}

                {/* Timeline Dot */}
                <div className="position-absolute top-0 start-0" style={{zIndex: 2}}>
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                       style={{width: '40px', height: '40px'}}>
                    <span className="fw-bold">{index + 1}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="ms-5 ps-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h4 className="fw-bold mb-1">{edu.degree}</h4>
                          <h5 className="text-muted mb-0">{edu.institution}</h5>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold text-primary">
                            {calculateDuration(edu.startYear, edu.endYear, edu.current)}
                          </div>
                          <div className="text-muted small">{edu.location}</div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-1">
                          {edu.category?.toUpperCase() || 'EDUCATION'}
                        </span>
                      </div>

                      {edu.fieldOfStudy && (
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-book text-muted me-2"></i>
                          <span>{edu.fieldOfStudy}</span>
                        </div>
                      )}

                      {edu.grade && (
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-award text-muted me-2"></i>
                          <span className="fw-bold">{edu.grade}</span>
                        </div>
                      )}

                      {edu.description && (
                        <p className="text-dark mb-0">{edu.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {education.length > 3 && (
          <div className="text-center mt-5">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/education")}
            >
              View All Education →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;