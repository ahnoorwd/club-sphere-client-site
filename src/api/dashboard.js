import axios from "axios";
import { baseURL } from "./baseURL";

export const getMemberDashboardStats = async (email) => {
  const res = await axios.get(
    `${baseURL}/member/dashboard-stats/${email}`
  );
  return res.data;
};