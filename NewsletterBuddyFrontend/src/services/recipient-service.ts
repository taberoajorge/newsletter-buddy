import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error("API call error:", error);
    return Promise.reject(error);
  }
);

export const sendNewsletter = async (formData: FormData) => {
  const { data } = await apiClient.post("/send-email", formData);
  return data;
};

export const addSubscriber = async (name: string, email: string, type: string) => {
  const { data } = await apiClient.post("/recipients", { name, email, type });
  return data;
};

export const getRecipients = async () => {
  const { data } = await apiClient.get("/recipients");
  return data;
};

export const getSentEmails = async () => {
  const { data } = await apiClient.get("/sent-emails");
  return data;
};

export const unsubscribeUser = async (userId: string) => {
  const { data } = await apiClient.get(`/unsubscribe/${userId}`);
  return data;
};