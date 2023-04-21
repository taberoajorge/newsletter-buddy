import axios from "axios";

const baseURL = process.env.NODE_ENV === "production" ? "http://backend:3000" : "http://localhost:3000";

export const sendNewsletter = async (formData: FormData) => {
  const response = await axios.post(`${baseURL}/send-email`, formData);
  return response.data;
};

export const addSubscriber = async (name: string, email: string) => {
  const response = await axios.post(`${baseURL}/recipients`, {
    name,
    email,
  });
  return response.data;
};
