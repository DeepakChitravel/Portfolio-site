import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicCertificates } from "../api/api";

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const data = await getPublicCertificates();
      
      const previewCertificates = data.slice(0, 3).map(cert => ({
        ...cert,
        icon: getCategoryIcon(cert.category),
        color: getCategoryColor(cert.category)
      }));
      
      setCertifications(previewCertificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      setCertifications([
        {
          _id: "1",
          title: "AWS Certified Developer - Associate",
          issuer: "Amazon Web Services",
          description: "Designing, deploying, and operating scalable systems on AWS",
          category: "cloud",
          icon: "☁️",
          color: "warning",
          issueDate: "2023-08-15",
          credentialUrl: "#",
          skills: ["AWS", "Cloud Architecture", "DevOps", "Security"],
          image: "https://res.cloudinary.com/dghnjzlef/image/upload/v1768709387/eghoxhdsk2cwbujeevzi.webp"
        },
        {
          _id: "2",
          title: "React Professional Certificate",
          issuer: "Meta",
          description: "Advanced React patterns, hooks, and performance optimization",
          category: "development",
          icon: "⚛️",
          color: "info",
          issueDate: "2023-05-20",
          credentialUrl: "#",
          skills: ["React", "JavaScript", "Redux", "Next.js"],
          image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
          _id: "3",
          title: "Full Stack Web Development",
          issuer: "Coding Academy",
          description: "Comprehensive full-stack development with modern frameworks",
          category: "web",
          icon: "🚀",
          color: "primary",
          issueDate: "2023-02-10",
          credentialUrl: "#",
          skills: ["MERN Stack", "REST APIs", "MongoDB", "Express"],
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'cloud': '☁️', 'aws': '☁️', 'development': '⚛️', 'react': '⚛️',
      'web': '🚀', 'fullstack': '🚀', 'data': '📊', 'ai': '🤖',
      'security': '🔒', 'design': '🎨', 'database': '🗄️', 'devops': '🔧'
    };
    return iconMap[category] || '📜';
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'cloud': 'warning', 'development': 'info', 'web': 'primary',
      'fullstack': 'primary', 'data': 'success', 'ai': 'dark',
      'security': 'danger', 'design': 'purple', 'database': 'secondary',
      'devops': 'warning'
    };
    return colorMap[category] || 'secondary';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <div className="placeholder-glow">
              <div className="placeholder col-3 mx-auto" style={{height: '30px'}}></div>
            </div>
          </div>
          <div className="row g-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="placeholder-glow">
                      <div className="placeholder rounded-3 mb-3" style={{height: '150px'}}></div>
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

  return (
    <section className="py-5 bg-white" id="certifications">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-pill mb-3">
            <i className="bi bi-award me-2"></i>Certifications
          </span>
          <h2 className="fw-bold mb-3">Professional Certifications</h2>
          <p className="text-muted mb-4">
            Industry-recognized credentials validating technical expertise
          </p>
        </div>

        {/* Certifications Grid */}
        {certifications.length > 0 ? (
          <>
            <div className="row g-4 mb-5">
              {certifications.map((cert) => (
                <div key={cert._id} className="col-lg-4 col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    {/* Certificate Image - Full width */}
                    <div className="position-relative" style={{height: '200px', overflow: 'hidden'}}>
                      {cert.image ? (
                        <img 
                          src={cert.image}
                          alt={cert.title}
                          className="img-fluid w-100 h-100"
                          style={{objectFit: 'contain', backgroundColor: '#f8f9fa'}}
                        />
                      ) : (
                        <div className={`bg-${cert.color} bg-opacity-10 h-100 d-flex align-items-center justify-content-center`}>
                          <span className="display-4">{cert.icon}</span>
                        </div>
                      )}
                      <span className={`position-absolute top-0 end-0 m-3 badge bg-${cert.color} px-3 py-2`}>
                        {cert.category?.toUpperCase() || 'CERT'}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="card-body">
                      <h5 className="fw-bold mb-2">{cert.title}</h5>
                      <div className="d-flex align-items-center text-muted small mb-3">
                        <i className={`bi bi-building text-${cert.color} me-2`}></i>
                        {cert.issuer}
                      </div>
                      
                      <p className="text-muted small mb-3">{cert.description}</p>

                      {/* Actions */}
                      <div className="d-flex justify-content-between">
                        <button 
                          className={`btn btn-${cert.color} btn-sm`}
                          data-bs-toggle="modal"
                          data-bs-target="#certModal"
                          onClick={() => setSelectedCert(cert)}
                        >
                          <i className="bi bi-eye me-1"></i> View Certificate
                        </button>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-secondary btn-sm"
                          >
                            <i className="bi bi-link-45deg me-1"></i> Verify
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <button
                className="btn btn-primary px-4 py-2"
                onClick={() => navigate('/certificates')}
              >
                <i className="bi bi-award me-2"></i>
                View All Certifications
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <div className="display-4 text-muted mb-3">
              <i className="bi bi-award"></i>
            </div>
            <h5 className="fw-bold mb-3">No Certifications</h5>
            <p className="text-muted mb-4">
              Certificates will appear here when added.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/certificates')}>
              <i className="bi bi-plus-circle me-2"></i>
              Add Certificate
            </button>
          </div>
        )}
      </div>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="certModal" tabIndex="-1" aria-labelledby="certModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            {selectedCert && (
              <>
                {/* Modal Header */}
                <div className="modal-header">
                  <div className="d-flex align-items-center">
                    <div className={`bg-${selectedCert.color} text-white rounded-2 p-3 me-3`}>
                      <span className="fs-3">{selectedCert.icon}</span>
                    </div>
                    <div>
                      <h5 className="modal-title fw-bold">{selectedCert.title}</h5>
                      <p className="text-muted mb-0 small">{selectedCert.issuer}</p>
                    </div>
                  </div>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                  {/* Certificate Image - Medium Size */}
                  <div className="text-center mb-4">
                    {selectedCert.image ? (
                      <div className="bg-light rounded p-3">
                        <img 
                          src={selectedCert.image}
                          alt={selectedCert.title}
                          className="img-fluid"
                          style={{maxHeight: '350px', objectFit: 'contain'}}
                        />
                      </div>
                    ) : (
                      <div className={`bg-${selectedCert.color} bg-opacity-10 rounded-3 p-4`}>
                        <div className={`bg-${selectedCert.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
                             style={{width: '80px', height: '80px'}}>
                          <span className="fs-2">{selectedCert.icon}</span>
                        </div>
                        <p className="text-muted small">Certificate Preview</p>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center p-3 bg-light rounded">
                        <i className="bi bi-calendar text-primary me-3"></i>
                        <div>
                          <div className="small text-muted">Issue Date</div>
                          <div className="fw-medium">{formatDate(selectedCert.issueDate)}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center p-3 bg-light rounded">
                        <i className={`bi bi-tag text-${selectedCert.color} me-3`}></i>
                        <div>
                          <div className="small text-muted">Category</div>
                          <div className="fw-medium">{selectedCert.category || 'General'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Description</h6>
                    <p className="text-dark">{selectedCert.description}</p>
                  </div>

                  {/* Skills */}
                  {selectedCert.skills && selectedCert.skills.length > 0 && (
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Skills</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {selectedCert.skills.map((skill, index) => (
                          <span key={index} className="badge bg-light text-dark border px-3 py-1">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Verification */}
                  {selectedCert.credentialUrl && (
                    <div className="bg-light rounded p-3">
                      <h6 className="fw-bold mb-3">Verification</h6>
                      <a
                        href={selectedCert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn btn-${selectedCert.color} w-100`}
                      >
                        <i className="bi bi-link-45deg me-2"></i>
                        Verify Certificate
                      </a>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => navigate('/certificates')}
                    data-bs-dismiss="modal"
                  >
                    View All Certificates
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;