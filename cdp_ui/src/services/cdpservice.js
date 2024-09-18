import axios from "axios";
import { BASE_URL, CDP_DETAILS_API } from "../constants";

export const getCdpDataService = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/${CDP_DETAILS_API}/${1234}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};