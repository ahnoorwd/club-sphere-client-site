import axios from "axios";

export const createClub = async (clubInfo) => {
  const res = await axios.post("http://localhost:5000/clubs", clubInfo);
  return res.data;
};

export const getManagerClubs = async (email) => {
  const res = await axios.get(`http://localhost:5000/clubs?email=${email}`);
  return res.data;
};

export const getAllClubs = async () => {
  const res = await axios.get("http://localhost:5000/clubs");
  return res.data;
};

export const updateClubStatus = async (id, status) => {
  const res = await axios.patch(`http://localhost:5000/clubs/status/${id}`, {
    status,
  });
  return res.data;
};