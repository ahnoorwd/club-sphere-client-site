import axios from "axios";

export const getAllEvents = async () => {
    const res = await axios.get("http://localhost:5000/events");
    return res.data;
};

export const getEventById = async (id) => {
    const res = await axios.get(`http://localhost:5000/events/${id}`);
    return res.data;
};