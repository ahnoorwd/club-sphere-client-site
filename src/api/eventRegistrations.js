import axios from "axios";

export const checkEventRegistration = async (email, eventId) => {
  const res = await axios.get(
    `http://localhost:5000/event-registrations/check?email=${email}&eventId=${eventId}`
  );
  return res.data;
};

export const registerEvent = async (registrationInfo) => {
  const res = await axios.post(
    "http://localhost:5000/event-registrations",
    registrationInfo
  );
  return res.data;
};

export const getUserRegisteredEvents = async (email) => {
  const res = await axios.get(
    `http://localhost:5000/event-registrations/user/${email}`
  );
  return res.data;
};

