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

export const leaveClub = async (membershipId) => {
  const res = await axios.delete(
    `http://localhost:5000/memberships/${membershipId}`
  );
  return res.data;
};

// 30||04||26

export const getUpcomingEvents = async () => {
  const res = await axios.get("http://localhost:5000/events");
  
  // sort upcoming events
  const events = res.data;

  const upcoming = events
    .filter((e) => new Date(e.eventDate) > new Date())
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
    .slice(0, 4); // show only 4

  return upcoming;
};