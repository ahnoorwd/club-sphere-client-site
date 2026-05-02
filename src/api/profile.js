import axios from "axios";
import { baseURL } from "./baseURL";

export const getProfileStats = async (email) => {
  const res = await axios.get(`${baseURL}/profile-stats/${email}`);
  return res.data;
};