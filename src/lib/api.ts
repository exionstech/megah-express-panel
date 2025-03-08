import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://127.0.0.1:8080";

const ApiInstance = (authorization: string) => {
  return axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": authorization
    },
  });
};

export default ApiInstance;
