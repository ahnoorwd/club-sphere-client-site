import axios from "axios";
import { baseURL } from "./baseURL";

export const saveUserToDB = async (userInfo) => {
  const res = await axios.post(`${baseURL}/users`, userInfo);
  return res.data;
};

export const getUserRole = async (email) => {
  const res = await axios.get(`${baseURL}/users/role/${email}`);
  return res.data;
};
export const getAllUsers = async () => {
  const res = await axios.get(`${baseURL}/users`);
  return res.data;
};

export const updateUserRole = async (id, role) => {
  const res = await axios.patch(`${baseURL}/users/role/${id}`, {
    role,
  });

  return res.data;
};

export const getCommunityLeaders = async () => {
  const res = await axios.get(`${baseURL}/community-leaders`);
  return res.data;
};