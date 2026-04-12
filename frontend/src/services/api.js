import axios from "axios";

const rawApiUrl = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").trim();
// Only convert to https if it's not already a protocol URL and not localhost
const normalizedApiUrl = /^https?:\/\//i.test(rawApiUrl) 
  ? rawApiUrl 
  : (rawApiUrl.includes("localhost") || rawApiUrl.includes("127.0.0.1") 
      ? `http://${rawApiUrl}` 
      : `https://${rawApiUrl}`);

const apiClient = axios.create({
  baseURL: normalizedApiUrl,
  timeout: 30000,
});

export async function askTutor(messages) {
  const response = await apiClient.post("/api/ask", { messages });
  return response.data;
}
