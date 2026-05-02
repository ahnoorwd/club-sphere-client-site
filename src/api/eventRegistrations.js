import axios from "axios";
import { baseURL } from "./baseURL";

export const checkEventRegistration = async (email, eventId) => {
  const res = await axios.get(
    `${baseURL}/event-registrations/check?email=${email}&eventId=${eventId}`
  );
  return res.data;
};

export const registerEvent = async (registrationInfo) => {
  const res = await axios.post(
    `${baseURL}/event-registrations`,
    registrationInfo
  );
  return res.data;
};

export const getUserRegisteredEvents = async (email) => {
  const res = await axios.get(
    `${baseURL}/event-registrations/user/${email}`
  );
  return res.data;
};

