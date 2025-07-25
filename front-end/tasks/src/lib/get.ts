import api from '../services/api';
import Cookies from "js-cookie";

export async function getTasks() {
  const token = Cookies.get("auth_token");
  try {
    const response = await api.get('/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}