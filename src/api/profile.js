import axios from "axios";

export const getProfileStats = async (email) => {
  const res = await axios.get(`http://localhost:5000/profile-stats/${email}`);
  return res.data;
};