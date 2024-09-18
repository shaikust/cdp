import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Get Cdp Data
export const fetchCdpData = async () => {
  const response = await axios.get(`${API_BASE_URL}/sustainability`);
  return response.data;
};
