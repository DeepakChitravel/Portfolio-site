// src/api/api.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

/* ================= PUBLIC PROJECTS (portfolio site) ================= */
export const getPublicProjects = async () => {
  const res = await axios.get(`${API_BASE}/projects/public`);
  return res.data;
};

/* ================= PUBLIC PROFILE ================= */
export const getPublicProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne().select("-user -__v");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error("PUBLIC PROFILE ERROR:", err);
    res.status(500).json({ message: "Failed to get public profile" });
  }
};


/* ================= PUBLIC ACHIEVEMENTS ================= */
export const getPublicAchievements = async () => {
  const res = await axios.get(`${API_BASE}/achievements`);
  return res.data;
};

export const getPublicEducation = async () => {
  const res = await axios.get(`${API_BASE}/educations`);
  return res.data;
};

/* ================= PUBLIC CERTIFICATES ================= */
export const getPublicCertificates = async () => {
  const res = await axios.get(`${API_BASE}/certificates`);
  return res.data;
};
