import axios from "axios";

export const getAllEvents = async () => {
  const res = await axios.get("http://localhost:5000/events");
  return res.data;
};

export const getEventById = async (id) => {
  const res = await axios.get(`http://localhost:5000/events/${id}`);
  return res.data;
};

export const getApprovedManagerClubs = async (email) => {
  const res = await axios.get(
    `http://localhost:5000/manager/approved-clubs/${email}`
  );
  return res.data;
};

export const createEvent = async (eventInfo) => {
  const res = await axios.post("http://localhost:5000/events", eventInfo);
  return res.data;
};

export const getManagerEvents = async (email) => {
  const res = await axios.get(`http://localhost:5000/events/manager/${email}`);
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await axios.delete(`http://localhost:5000/events/${id}`);
  return res.data;
};

export const updateEvent = async (id, eventInfo) => {
  const res = await axios.patch(`http://localhost:5000/events/${id}`, eventInfo);
  return res.data;
};