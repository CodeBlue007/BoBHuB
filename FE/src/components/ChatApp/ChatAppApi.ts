import * as API from '../../api/API';
import { MessageInfo } from '../../store/chatSlice';

export const getParties = async () => await API.get(`/api/parties`);

export const setLog = (key: string, payload: MessageInfo) => {
  const localString = localStorage.getItem(key);

  if (!localString) localStorage.setItem(key, JSON.stringify([payload]));
  else {
    const localArr = JSON.parse(localString);
    localArr.push(payload);
    localStorage.setItem(key, JSON.stringify(localArr));
  }
};
