import { get } from '../../../api/API';

export const fetchParties = async () => {
  try {
    const parties = await get('/api/parties');
    return parties;
  } catch (error) {
    console.log(error);
  }
};
