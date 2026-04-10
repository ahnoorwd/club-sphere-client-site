import axios from "axios";

export const saveUserToDB = async (userInfo) => {
  const res = await axios.post("http://localhost:5000/users", userInfo);
  return res.data;
};

export const getUserRole = async (email) => {
  const res = await axios.get(`http://localhost:5000/users/role/${email}`);
  return res.data;
};