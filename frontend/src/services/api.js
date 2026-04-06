import axios from "axios";

const rawApiUrl = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").trim();
const normalizedApiUrl = /^https?:\/\//i.test(rawApiUrl) ? rawApiUrl : `https://${rawApiUrl}`;

const apiClient = axios.create({
  baseURL: normalizedApiUrl,
  timeout: 30000,
});

export async function askTutor(question) {
  const response = await apiClient.post("/api/ask", { question });
  return response.data;
}
