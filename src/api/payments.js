import axios from "axios";

export const createPaymentIntent = async (amount) => {
  const res = await axios.post("http://localhost:5000/create-payment-intent", {
    amount,
  });
  return res.data;
};

export const savePayment = async (paymentInfo) => {
  const res = await axios.post("http://localhost:5000/payments", paymentInfo);
  return res.data;
};