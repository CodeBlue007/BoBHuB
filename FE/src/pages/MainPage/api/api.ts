import { get } from '../../../api/API';

export const fetchParties = async () => {
  try {
    const parties = await get('/api/parties');
    return parties;
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfoAPI = async () => {
  try {
    const res = await get('/api/users');
    return res;
  } catch (error) {
    console.log(error);
  }
};
