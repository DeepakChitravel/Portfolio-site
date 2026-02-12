import axios from "axios";

export const getPublicProfile = async () => {
  const res = await axios.get("https://portfolio-backend-oiq9.onrender.com/api/profile/public");
  return res.data;
};
