import axios from 'axios';
const axiosInstance = axios.create({ withCredentials: true });

export const fetchParties = async () => {
  try {
    const res = await axiosInstance('/api/parties');
    const parties = await res.data;
    return parties;
  } catch (error) {
    console.log(error);
  }
};
