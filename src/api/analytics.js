import axios from "axios";
import { baseURL } from "./baseURL";

export const getAdminAnalytics = async () => {
  
  const res = await axios.get(`${baseURL}/admin/analytics`);
  return res.data;
};