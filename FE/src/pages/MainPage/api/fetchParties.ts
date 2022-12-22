import { get } from '../../../api/API';

export const fetchParties = async () => {
  try {
    const res = await get('/api/parties');
    const parties = await res.data;
    return parties;
  } catch (error) {
    console.log(error);
  }
};
