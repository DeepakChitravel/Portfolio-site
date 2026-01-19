import React from 'react';

const HeroSection = ({ profile }) => {
  if (!profile) return null;

  return (
    <section className="hero-section position-relative overflow-hidden bg-gradient-primary text-white pt-5">
      {/* Background elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
      <div className="position-absolute top-0 end-0 w-50 h-100 bg-primary opacity-10" 
           style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}></div>
      
      <div className="container position-relative z-1" style={{ paddingTop: '80px' }}>
        <div className="row align-items-center min-vh-75 py-5">
          {/* Left Column - Text Content */}
          <div className="col-lg-6 col-md-8 mb-5 mb-lg-0">
            <div className="mb-4">
              <span className="badge bg-white text-primary px-4 py-2 rounded-pill d-inline-flex align-items-center shadow-sm">
                <span className="bg-primary rounded-circle me-2" style={{width: '8px', height: '8px'}}></span>
                Open to Opportunities
              </span>
            </div>
            
            <h1 className="display-4 fw-bold mb-3">
              Hi, I'm <span className="text-warning">{profile.name}</span>
            </h1>
            
            <h2 className="fs-3 fw-light mb-4 opacity-90">
              {profile.role}
            </h2>
            
            <p className="lead mb-5 opacity-90">
              {profile.shortIntro || "Full-stack developer passionate about building scalable web applications with modern technologies."}
            </p>
            
            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-3">
              <a
                href={profile.resume ? `http://localhost:5000${profile.resume}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light btn-lg px-5"
              >
                <i className="bi bi-file-earmark-text me-2"></i>
                View Resume
              </a>
              
              <a 
                href={`mailto:${profile.email}`} 
                className="btn btn-outline-light btn-lg px-5"
              >
                <i className="bi bi-envelope me-2"></i>
                Contact Me
              </a>
            </div>
          </div>
          
          {/* Right Column - Profile Image */}
          <div className="col-lg-6 col-md-4">
            <div className="text-center">
              <div className="rounded-circle overflow-hidden mx-auto border-5 border-white shadow-lg"
                   style={{width: '350px', height: '350px'}}>
                <img 
                  src={profile.avatar || "https://via.placeholder.com/400"} 
                  alt={profile.name}
                  className="img-fluid w-100 h-100"
                  style={{objectFit: 'cover'}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
        <a href="#skills" className="text-decoration-none text-white">
          <div className="d-flex flex-column align-items-center">
            <span className="mb-2 opacity-75">Scroll to explore</span>
            <i className="bi bi-chevron-down fs-4 animate-bounce"></i>
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;