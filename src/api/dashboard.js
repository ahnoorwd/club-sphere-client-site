import axios from "axios";

export const getMemberDashboardStats = async (email) => {
  const res = await axios.get(
    `http://localhost:5000/member/dashboard-stats/${email}`
  );
  return res.data;
};