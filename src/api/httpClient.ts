import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://1mgy6330f9.execute-api.us-east-2.amazonaws.com/production",
  headers: {
    "Content-Type": "application/json",
  },
});
