import axios from "axios";

export const checkMembership = async (email, clubId) => {
  const res = await axios.get(
    `http://localhost:5000/memberships/check?email=${email}&clubId=${clubId}`
  );
  return res.data;
};

export const createMembership = async (membershipInfo) => {
  const res = await axios.post(
    "http://localhost:5000/memberships",
    membershipInfo
  );
  return res.data;
};

export const getUserMemberships = async (email) => {
  const res = await axios.get(`http://localhost:5000/memberships/user/${email}`);
  return res.data;
};