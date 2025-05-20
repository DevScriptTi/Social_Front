import axios from 'axios';
import { cookies } from 'next/headers';
import { decrypt } from './session';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept':'application/json'
  },
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const cookie = (await cookies()).get("session")?.value;
      const session = await decrypt(cookie);
      const token = session?.token;
      

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here (e.g., 401 unauthorized, 403 forbidden)
    return Promise.reject(error);
  }
);

export default axiosInstance; 