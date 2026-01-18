import { useEffect, useState } from "react";
import { getPublicProjects } from "../api/api.js";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicProjects()
      .then((data) => {
        console.log("PROJECTS FROM API →", data);
        setProjects(data);
      })
      .catch((err) => console.error("Error loading projects:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (projects.length === 0) return <p>No projects available yet.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Projects</h2>

      {projects.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>{p.title}</h3>

          {p.shortIntro && <p><strong>{p.shortIntro}</strong></p>}

          {p.image && (
            <img
              src={p.image}
              alt={p.title}
              style={{ width: "250px", height: "auto", marginBottom: "10px" }}
            />
          )}

          <p>{p.description}</p>

          <div style={{ marginTop: "10px" }}>
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: "10px" }}
              >
                🔗 Live Demo
              </a>
            )}

            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                💻 GitHub
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;
