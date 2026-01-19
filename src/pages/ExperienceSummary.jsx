import React from 'react';

const ExperienceSummary = () => {
  return (
    <section id="experience" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Professional Highlights</h2>
          <p className="text-muted">Key experience and expertise areas</p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center p-4">
                <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3 d-inline-block mb-3">
                  <span className="fs-1">💼</span>
                </div>
                <h4 className="fw-bold mb-3">Experience</h4>
                <p className="text-muted mb-0">
                  2+ years in full-stack development, specializing in React, Node.js, and cloud technologies
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center p-4">
                <div className="bg-success bg-opacity-10 text-success rounded-3 p-3 d-inline-block mb-3">
                  <span className="fs-1">🎯</span>
                </div>
                <h4 className="fw-bold mb-3">Expertise</h4>
                <p className="text-muted mb-0">
                  Modern web applications, REST APIs, database design, and scalable architecture
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center p-4">
                <div className="bg-warning bg-opacity-10 text-warning rounded-3 p-3 d-inline-block mb-3">
                  <span className="fs-1">🚀</span>
                </div>
                <h4 className="fw-bold mb-3">Delivery</h4>
                <p className="text-muted mb-0">
                  15+ successful projects delivered on time with high client satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSummary;