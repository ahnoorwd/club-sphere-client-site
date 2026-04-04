import axios from "axios";

export const saveUserToDB = async (userInfo) => {
  const res = await axios.post("http://localhost:5000/users", userInfo);
  return res.data;
};