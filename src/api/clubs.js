import axios from "axios";

export const createClub = async (clubInfo) => {
  const res = await axios.post("http://localhost:5000/clubs", clubInfo);
  return res.data;
};