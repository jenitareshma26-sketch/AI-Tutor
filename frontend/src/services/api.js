import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  timeout: 30000,
});

export async function askTutor(question) {
  const response = await apiClient.post("/api/ask", { question });
  return response.data;
}
