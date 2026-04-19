import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const TechnicalSkills = ({ profile }) => {
  if (!profile) return null;

  const skills = profile.skills || [];

  // Split into 2 rows for marquee
  const mid = Math.ceil(skills.length / 2);
  const firstRow = skills.slice(0, mid);
  const secondRow = skills.slice(mid);

  return (
    <section id="skills" className="py-4 py-md-5 bg-light">
      <Container>

        {/* Header */}
        <Row className="mb-4 mb-md-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-6 fw-bold mb-3">Technical Skills</h2>
            <p className="lead text-muted mb-4">
              Technologies and tools I work with
            </p>
            <div className="bg-primary mx-auto mb-4"
              style={{ width: '50px', height: '3px' }}></div>
          </Col>
        </Row>

        {skills.length > 0 ? (
          <Row className="justify-content-center">
            <Col xs={12} lg={10}>

              {/* ✅ MOBILE MARQUEE */}
              <div className="d-md-none">

                {/* Row 1 */}
                <div className="marquee">
                  <div className="marquee-track">
                    {firstRow.concat(firstRow).map((skill, index) => (
                      <div key={index} className="skill-pill mx-2">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="marquee mt-3">
                  <div className="marquee-track reverse">
                    {secondRow.concat(secondRow).map((skill, index) => (
                      <div key={index} className="skill-pill mx-2">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ✅ DESKTOP GRID */}
              <div className="d-none d-md-flex flex-wrap justify-content-center gap-3">

                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-pill d-flex align-items-center px-4 py-2 bg-white rounded-pill border shadow-sm"
                  >
                    <span className="fw-medium">{skill}</span>
                    <span className="badge bg-primary ms-2 rounded-circle">
                      {skill.charAt(0)}
                    </span>
                  </div>
                ))}

              </div>

              {/* Count */}
              <div className="text-center mt-4">
                <div className="bg-white d-inline-flex px-3 py-2 rounded-pill border shadow-sm">
                  <span className="text-muted me-2">Total Skills:</span>
                  <span className="fw-bold text-primary">{skills.length}</span>
                </div>
              </div>

            </Col>
          </Row>
        ) : (
          <div className="text-center">No skills available</div>
        )}
      </Container>

      {/* ✅ STYLES */}
      <style jsx>{`

        /* Marquee */
        .marquee {
          overflow: hidden;
          width: 100%;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: scroll 25s linear infinite;
        }

        .marquee-track.reverse {
          animation-direction: reverse;
        }

        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* Skill pill */
        .skill-pill {
          white-space: nowrap;
          background: white;
          border-radius: 50px;
          padding: 8px 14px;
          border: 1px solid #eee;
          font-weight: 500;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        /* Desktop hover */
        @media (min-width: 768px) {
          .skill-pill:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          }
        }

      `}</style>
    </section>
  );
};

export default TechnicalSkills;