import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";
import { getPublicExperiences } from "../api/api";

const ExperienceSummary = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getPublicExperiences();
      setData(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      id="experience"
      className="py-5"
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
      }}
    >
      <Container>

        {/* HEADER */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <Badge bg="primary" className="px-4 py-2 mb-3 rounded-pill shadow-sm">
              <FaBriefcase className="me-2" />
              Professional Journey
            </Badge>

            <h2 className="display-5 fw-bold mb-3">Experience</h2>
            <p className="lead text-muted mb-4">Work & project highlights</p>
          </Col>
        </Row>

        {/* EXPERIENCE */}
        <Row className="g-4">
          {data.length === 0 ? (
            <p className="text-center text-muted">No experience added</p>
          ) : (
            data.map((item, index) => (
              <Col md={6} key={index}>
                <div
                  className="p-4 h-100"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    border: "1px solid rgba(99,102,241,0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 30px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* TOP (Logo + Title + Badge) */}
                  <div className="d-flex align-items-center justify-content-between mb-3">

                    {/* LEFT */}
                    <div className="d-flex align-items-center gap-2">

                      {/* LOGO or FALLBACK */}
                      {(item.image || item.logo) ? (
                        <img
                          src={item.image || item.logo}
                          alt={item.organization}
                          style={{
                            width: "38px",
                            height: "38px",
                            objectFit: "contain",
                            borderRadius: "8px",
                            background: "#fff",
                            padding: "4px",
                            border: "1px solid #eee"
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "8px",
                            background: "#6366f1",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold"
                          }}
                        >
                          {item.organization?.charAt(0)}
                        </div>
                      )}

                      <h5 className="fw-bold mb-0">{item.title}</h5>
                    </div>

                    {/* BADGE */}
                    <Badge
                      style={{
                        background: "#6366f1",
                        padding: "6px 12px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {item.type}
                    </Badge>

                  </div>

                  {/* ROLE */}
                  <p className="text-muted mb-2 small">
                    {item.role} • {item.organization}
                  </p>

                  {/* META */}
                  <div className="text-muted small mb-3 d-flex flex-wrap gap-3">
                    <span>
                      <FaCalendarAlt className="me-1" />
                      {item.startDate} - {item.current ? "Present" : item.endDate}
                    </span>

                    {item.location && (
                      <span>
                        <FaMapMarkerAlt className="me-1" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                    {item.description}
                  </p>

                  {/* TECH */}
                  {item.technologies?.length > 0 && (
                    <div className="mb-3">
                      {item.technologies.map((tech, i) => (
                        <span
                          key={i}
                          style={{
                            background: "#eef2ff",
                            color: "#4f46e5",
                            padding: "5px 10px",
                            borderRadius: "8px",
                            fontSize: "0.75rem",
                            marginRight: "6px",
                            display: "inline-block",
                            marginBottom: "6px",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* LINKS */}
                  <div className="d-flex gap-3 mt-auto">
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none fw-medium d-flex align-items-center gap-1"
                        style={{ color: "#6366f1" }}
                      >
                        <FaExternalLinkAlt size={12} />
                        Live
                      </a>
                    )}

                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none fw-medium d-flex align-items-center gap-1"
                        style={{ color: "#111827" }}
                      >
                        <FaGithub size={14} />
                        Code
                      </a>
                    )}
                  </div>

                </div>
              </Col>
            ))
          )}
        </Row>

      </Container>
    </section>
  );
};

export default ExperienceSummary;