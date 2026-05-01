import axios from "axios";

export const saveUserToDB = async (userInfo) => {
  const res = await axios.post("http://localhost:5000/users", userInfo);
  return res.data;
};

export const getUserRole = async (email) => {
  const res = await axios.get(`http://localhost:5000/users/role/${email}`);
  return res.data;
};
export const getAllUsers = async () => {
  const res = await axios.get("http://localhost:5000/users");
  return res.data;
};

export const updateUserRole = async (id, role) => {
  const res = await axios.patch(`http://localhost:5000/users/role/${id}`, {
    role,
  });

  return res.data;
};

export const getCommunityLeaders = async () => {
  const res = await axios.get("http://localhost:5000/community-leaders");
  return res.data;
};