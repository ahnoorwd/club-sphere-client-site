import axios from "axios";
import { baseURL } from "./baseURL";

export const checkMembership = async (email, clubId) => {
  const res = await axios.get(
    `${baseURL}/memberships/check?email=${email}&clubId=${clubId}`
  );
  return res.data;
};

export const createMembership = async (membershipInfo) => {
  const res = await axios.post(
    `${baseURL}/memberships`,
    membershipInfo
  );
  return res.data;
};

export const getUserMemberships = async (email) => {
  const res = await axios.get(`${baseURL}/memberships/user/${email}`);
  return res.data;
};

export const leaveClub = async (membershipId) => {
  const res = await axios.delete(
    `${baseURL}/memberships/${membershipId}`
  );
  return res.data;
};

// 30||04||26

export const getUpcomingEvents = async () => {
  const res = await axios.get(`${baseURL}/events`);
  
  // sort upcoming events
  const events = res.data;

  const upcoming = events
    .filter((e) => new Date(e.eventDate) > new Date())
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
    .slice(0, 4); // show only 4

  return upcoming;
};