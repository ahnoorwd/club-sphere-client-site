import axios from "axios";
import { baseURL } from "./baseURL";

export const createPaymentIntent = async (amount) => {
  const res = await axios.post(`${baseURL}/create-payment-intent`, {
    amount,
  });
  return res.data;
};

export const savePayment = async (paymentInfo) => {
  const res = await axios.post(`${baseURL}/payments`, paymentInfo);
  return res.data;
};

export const getUserPayments = async (email) => {
  const res = await axios.get(`${baseURL}/payments/user/${email}`);
  return res.data;
};

export const saveEventPayment = async (paymentInfo) => {
  const res = await axios.post(`${baseURL}/event-payments`, paymentInfo);
  return res.data;
};