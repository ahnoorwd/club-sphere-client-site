import axios from "axios";
import { baseURL } from "./baseURL";

export const createClub = async (clubInfo) => {
  
  const res = await axios.post(`${baseURL}/clubs`, clubInfo);
  return res.data;
};

export const getManagerClubs = async (email) => {
  const res = await axios.get(`${baseURL}/clubs?email=${email}`);
  return res.data;
};

export const getAllClubs = async () => {
  const res = await axios.get(`${baseURL}/clubs`);
  return res.data;
};

export const updateClubStatus = async (id, status) => {
  const res = await axios.patch(`${baseURL}/clubs/status/${id}`, {
    status,
  });
  return res.data;
};