import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Toast,
  ToastContainer,
  Spinner,
  InputGroup
} from "react-bootstrap";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaPaperPlane,
  FaDownload,
  FaUser,
  FaBuilding,
  FaComment,
  FaCheckCircle,
  FaClock,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaGlobe,
  FaPhone,
  FaCalendarAlt
} from "react-icons/fa";
import { toast } from "react-toastify";
import { sendContactMessage } from "../api/api";

function Contact({ profile }) {
  const [formStatus, setFormStatus] = useState({ success: false, message: "" });

  return (
    <section id="contact" className="py-5" style={{ 
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" 
    }}>
      <Container>
        {/* Header */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <div className="d-inline-flex align-items-center gap-2 bg-white px-4 py-2 rounded-pill shadow-sm mb-4">
              <FaPaperPlane className="text-primary" size={14} />
              <span className="fw-medium text-dark">Get In Touch</span>
            </div>
            
            <h2 className="display-5 fw-bold mb-3" style={{ 
              background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Let's Work Together
            </h2>
            <div
              className="mx-auto mb-4"
              style={{ 
                width: "80px", 
                height: "4px", 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "2px"
              }}
            />
            <p className="lead text-secondary" style={{ fontSize: "1.1rem" }}>
              I'm currently available for full-time opportunities and freelance projects.
              Let's create something amazing together!
            </p>
          </Col>
        </Row>

        {/* Contact Info Cards */}
        <Row className="g-4 justify-content-center mb-5">
          <Col lg={3} md={6}>
            <Card className="h-100 border-0 shadow-sm contact-card" style={{ 
              borderRadius: "20px",
              transition: "all 0.3s ease"
            }}>
              <Card.Body className="text-center p-4">
                <div className="icon-wrapper mb-4">
                  <FaEnvelope size={28} />
                </div>
                <h6 className="fw-bold mb-2" style={{ color: "#1e293b" }}>Email</h6>
                <p className="text-primary mb-0" style={{ fontSize: "0.95rem" }}>
                  {profile?.email || "deepakchitravel@gmail.com"}
                </p>
                <small className="text-muted">Response within 24 hours</small>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6}>
            <Card className="h-100 border-0 shadow-sm contact-card" style={{ 
              borderRadius: "20px",
              transition: "all 0.3s ease"
            }}>
              <Card.Body className="text-center p-4">
                <div className="icon-wrapper mb-4">
                  <FaMapMarkerAlt size={28} />
                </div>
                <h6 className="fw-bold mb-2" style={{ color: "#1e293b" }}>Location</h6>
                <p className="mb-0" style={{ fontSize: "0.95rem", color: "#475569" }}>
                  {profile?.location || "Tamil Nadu, India"}
                </p>
                <small className="text-muted">Remote / On-site</small>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6}>
            <Card className="h-100 border-0 shadow-sm contact-card" style={{ 
              borderRadius: "20px",
              transition: "all 0.3s ease"
            }}>
              <Card.Body className="text-center p-4">
                <div className="icon-wrapper mb-4">
                  <FaBriefcase size={28} />
                </div>
                <h6 className="fw-bold mb-2" style={{ color: "#1e293b" }}>Availability</h6>
                <p className="text-success mb-0" style={{ fontSize: "0.95rem", fontWeight: "500" }}>
                  Open to Opportunities
                </p>
                <small className="text-muted">Full-time • Freelance</small>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6}>
            <Card className="h-100 border-0 shadow-sm contact-card" style={{ 
              borderRadius: "20px",
              transition: "all 0.3s ease"
            }}>
              <Card.Body className="text-center p-4">
                <div className="icon-wrapper mb-4">
                  <FaCalendarAlt size={28} />
                </div>
                <h6 className="fw-bold mb-2" style={{ color: "#1e293b" }}>Timezone</h6>
                <p className="mb-0" style={{ fontSize: "0.95rem", color: "#475569" }}>
                  IST (UTC+5:30)
                </p>
                <small className="text-muted">India Standard Time</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Social Links */}
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <div className="d-flex justify-content-center gap-3">
              {profile?.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="social-link">
                  <FaLinkedin size={20} />
                </a>
              )}
              {profile?.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer"
                   className="social-link">
                  <FaGithub size={20} />
                </a>
              )}
              {profile?.twitter && (
                <a href={profile.twitter} target="_blank" rel="noopener noreferrer"
                   className="social-link">
                  <FaTwitter size={20} />
                </a>
              )}
              {profile?.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer"
                   className="social-link">
                  <FaGlobe size={20} />
                </a>
              )}
            </div>
          </Col>
        </Row>

        {/* CTA Buttons */}
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <Button
                href={`mailto:${profile?.email || "deepakchitravel@gmail.com"}`}
                size="lg"
                className="cta-btn cta-btn-primary"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: "50px",
                  padding: "14px 32px",
                  fontWeight: "600",
                  boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)"
                }}
              >
                <FaPaperPlane className="me-2" />
                Send Email
              </Button>

              <Button
                href={profile?.resume ? `https://portfolio-backend-oiq9.onrender.com${profile.resume}` : "#"}
                target="_blank"
                variant="outline-primary"
                size="lg"
                className="cta-btn cta-btn-outline"
                style={{
                  borderRadius: "50px",
                  padding: "14px 32px",
                  fontWeight: "600",
                  border: "2px solid #667eea",
                  color: "#667eea"
                }}
              >
                <FaDownload className="me-2" />
                Download Resume
              </Button>
            </div>
          </Col>
        </Row>

        {/* Contact Form */}
        <Row className="mt-4">
          <Col lg={10} className="mx-auto">
            <ContactForm profile={profile} />
          </Col>
        </Row>

        {/* Success Message */}
        {formStatus.success && (
          <Row className="mt-4">
            <Col lg={10} className="mx-auto">
              <div className="alert alert-success border-0 shadow-sm d-flex align-items-center" 
                   style={{ borderRadius: "16px", background: "#10b981", color: "white" }}>
                <FaCheckCircle className="me-3" size={24} />
                <div>
                  <strong>Message Sent Successfully!</strong>
                  <p className="mb-0 small opacity-75">I'll get back to you within 24 hours.</p>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>

      <style jsx="true">{`
        .contact-card {
          transition: all 0.3s ease;
        }
        .contact-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12) !important;
        }
        .icon-wrapper {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          color: #667eea;
        }
        .social-link {
          width: 48px;
          height: 48px;
          background: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        .social-link:hover {
          transform: translateY(-4px);
          color: #667eea;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.2);
        }
        .cta-btn {
          transition: all 0.3s ease;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
        }
        .cta-btn-primary:hover {
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4) !important;
        }
        .cta-btn-outline:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          color: white !important;
          border-color: transparent !important;
        }
      `}</style>
    </section>
  );
}

// Contact Form Component
function ContactForm({ profile }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);

    try {
      // Send to backend API
      const payload = {
        ...form,
        to: profile?.email || "deepakchitravel@gmail.com",
        timestamp: new Date().toISOString()
      };

      const response = await sendContactMessage(payload);
      
      if (response.success) {
        setSubmitted(true);
        toast.success("🎉 Message sent successfully! I'll get back to you soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        throw new Error(response.message || "Failed to send message");
      }
    } catch (error) {
  console.error("Contact form error:", error);

  toast.error("❌ Failed to send message. Try again later.");
} finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white shadow-sm rounded-4 p-5 text-center" style={{ 
        borderRadius: "24px",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
      }}>
        <div className="mb-4">
          <div className="d-inline-flex align-items-center justify-content-center p-4 rounded-circle" 
               style={{ background: "linear-gradient(135deg, #10b98120 0%, #05966920 100%)" }}>
            <FaCheckCircle size={48} style={{ color: "#10b981" }} />
          </div>
        </div>
        <h4 className="fw-bold mb-3" style={{ color: "#1e293b" }}>Thank You for Reaching Out!</h4>
        <p className="text-secondary mb-4">
          Your message has been successfully sent. I'll get back to you as soon as possible.
        </p>
        <Button
          variant="outline-primary"
          onClick={() => setSubmitted(false)}
          style={{ borderRadius: "50px", padding: "10px 24px" }}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-4 p-4 p-md-5" style={{ 
      borderRadius: "24px",
      background: "linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)",
      border: "1px solid rgba(102, 126, 234, 0.1)"
    }}>
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="p-3 rounded-3" style={{ background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)" }}>
          <FaPaperPlane size={20} style={{ color: "#667eea" }} />
        </div>
        <div>
          <h5 className="fw-bold mb-0" style={{ color: "#1e293b" }}>Send a Message</h5>
          <p className="text-muted small mb-0">Fill out the form below and I'll get back to you shortly</p>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row className="g-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-semibold small text-secondary">Full Name *</Form.Label>
              <InputGroup style={{ 
                borderRadius: "12px",
                boxShadow: errors.name ? "0 0 0 2px rgba(239, 68, 68, 0.1)" : "none"
              }}>
                <InputGroup.Text style={{ 
                  background: "#f8fafc", 
                  border: errors.name ? "1px solid #ef4444" : "1px solid #e2e8f0",
                  borderRight: "none",
                  borderRadius: "12px 0 0 12px"
                }}>
                  <FaUser size={14} className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  style={{
                    border: errors.name ? "1px solid #ef4444" : "1px solid #e2e8f0",
                    borderLeft: "none",
                    borderRadius: "0 12px 12px 0",
                    padding: "12px 16px",
                    fontSize: "0.95rem"
                  }}
                />
              </InputGroup>
              {errors.name && (
                <Form.Text className="text-danger small">{errors.name}</Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-semibold small text-secondary">Email Address *</Form.Label>
              <InputGroup style={{ 
                borderRadius: "12px",
                boxShadow: errors.email ? "0 0 0 2px rgba(239, 68, 68, 0.1)" : "none"
              }}>
                <InputGroup.Text style={{ 
                  background: "#f8fafc", 
                  border: errors.email ? "1px solid #ef4444" : "1px solid #e2e8f0",
                  borderRight: "none",
                  borderRadius: "12px 0 0 12px"
                }}>
                  <FaEnvelope size={14} className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  style={{
                    border: errors.email ? "1px solid #ef4444" : "1px solid #e2e8f0",
                    borderLeft: "none",
                    borderRadius: "0 12px 12px 0",
                    padding: "12px 16px",
                    fontSize: "0.95rem"
                  }}
                />
              </InputGroup>
              {errors.email && (
                <Form.Text className="text-danger small">{errors.email}</Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group>
              <Form.Label className="fw-semibold small text-secondary">Subject (Optional)</Form.Label>
              <InputGroup style={{ borderRadius: "12px" }}>
                <InputGroup.Text style={{ 
                  background: "#f8fafc", 
                  border: "1px solid #e2e8f0",
                  borderRight: "none",
                  borderRadius: "12px 0 0 12px"
                }}>
                  <FaBuilding size={14} className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  name="subject"
                  placeholder="Project Inquiry / Job Opportunity / Collaboration"
                  value={form.subject}
                  onChange={handleChange}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderLeft: "none",
                    borderRadius: "0 12px 12px 0",
                    padding: "12px 16px",
                    fontSize: "0.95rem"
                  }}
                />
              </InputGroup>
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group>
              <Form.Label className="fw-semibold small text-secondary">Message *</Form.Label>
              <InputGroup style={{ 
                borderRadius: "12px",
                boxShadow: errors.message ? "0 0 0 2px rgba(239, 68, 68, 0.1)" : "none"
              }}>
                <InputGroup.Text style={{ 
                  background: "#f8fafc", 
                  border: errors.message ? "1px solid #ef4444" : "1px solid #e2e8f0",
                  borderRight: "none",
                  borderRadius: "12px 0 0 12px",
                  alignItems: "flex-start",
                  paddingTop: "14px"
                }}>
                  <FaComment size={14} className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  placeholder="Tell me about your project, timeline, and budget..."
                  value={form.message}
                  onChange={handleChange}
                  isInvalid={!!errors.message}
                  style={{
                    border: errors.message ? "1px solid #ef4444" : "1px solid #e2e8f0",
                    borderLeft: "none",
                    borderRadius: "0 12px 12px 0",
                    padding: "14px 16px",
                    fontSize: "0.95rem",
                    resize: "vertical"
                  }}
                />
              </InputGroup>
              <div className="d-flex justify-content-between mt-1">
                {errors.message && (
                  <Form.Text className="text-danger small">{errors.message}</Form.Text>
                )}
                <small className="text-muted ms-auto">
                  {form.message.length} characters
                </small>
              </div>
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Button
              type="submit"
              disabled={loading}
              className="w-100 d-flex align-items-center justify-content-center gap-2 py-3"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "1rem",
                boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.3)";
              }}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </Button>
            <p className="text-center text-muted small mt-3 mb-0">
              <FaClock className="me-1" size={12} />
              I typically respond within 24 hours
            </p>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Contact;