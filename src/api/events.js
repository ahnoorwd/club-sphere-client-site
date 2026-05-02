import axios from "axios";
import { baseURL } from "./baseURL";

export const getAllEvents = async () => {
  const res = await axios.get(`${baseURL}/events`);
  return res.data;
};

export const getEventById = async (id) => {
  const res = await axios.get(`${baseURL}/events/${id}`);
  return res.data;
};

export const getApprovedManagerClubs = async (email) => {
  const res = await axios.get(
    `${baseURL}/manager/approved-clubs/${email}`
  );
  return res.data;
};

export const createEvent = async (eventInfo) => {
  const res = await axios.post(`${baseURL}/events`, eventInfo);
  return res.data;
};

export const getManagerEvents = async (email) => {
  const res = await axios.get(`${baseURL}/events/manager/${email}`);
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await axios.delete(`${baseURL}/events/${id}`);
  return res.data;
};

export const updateEvent = async (id, eventInfo) => {
  const res = await axios.patch(`${baseURL}/events/${id}`, eventInfo);
  return res.data;
};

// 29||04||26

export const getEventCapacity = async (id) => {
  const res = await axios.get(`${baseURL}/events/${id}/capacity`);
  return res.data;
};

export const getUpcomingEvents = async () => {
  const res = await axios.get(`${baseURL}/events`);
  
  // sort upcoming events
  const events = res.data;

 const upcoming = events
  .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
  .slice(0, 4); // show only 4

  return upcoming;
};