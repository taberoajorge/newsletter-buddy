import axios from "axios";

export const sendNewsletter = async (formData: FormData) => {
  const response = await axios.post("http://localhost:3000/send-email", formData);
  return response.data;
};

export const addSubscriber = async (name: string, email: string) => {
  const response = await axios.post("http://localhost:3000/recipients", {
    name,
    email,
  });
  return response.data;
};
