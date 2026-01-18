import axios from "axios";

export const getPublicProfile = async () => {
  const res = await axios.get("http://localhost:5000/api/profile/public");
  return res.data;
};
