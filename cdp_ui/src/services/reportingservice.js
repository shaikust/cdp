import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Get Energy Data
export const fetchEnergyData = async () => {
  const response = await axios.get(`${API_BASE_URL}/sustainability`);
  return response.data;
};

// Update Energy Data
export const saveEnergyData = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/sustainability`, { section: 'energy', data });
  return response.data;
};

// Delete Energy Data
export const resetEnergyData = async () => {
  const response = await axios.post(`${API_BASE_URL}/sustainability/energy`, { action: 'remove' });
  return response.data;
};

