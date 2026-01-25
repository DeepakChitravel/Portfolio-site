import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicProfile } from "../api/profile";
import { getPublicEducation } from "../api/api";
import Header from "./Header";
import HeroSection from "./HeroSection";
import CertificationsSection from "./Certificates";
import TechnicalSkills from './TechnicalSkills';
import Education from "./Education";
import ExperienceSummary from "./ExperienceSummary";
import Projects from './Projects'; // Add this import
import Footer from "./Footer";
import Contact from "./Contact";
function Home() {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eduLoading, setEduLoading] = useState(false);
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
      <Header profile={profile} />
      <HeroSection profile={profile} />
      <TechnicalSkills profile={profile} />
      <Education education={education} loading={eduLoading} />
<ExperienceSummary />
<Projects />

      {/* Certifications Section */}
      <CertificationsSection />

<Contact/>
<Footer/>
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