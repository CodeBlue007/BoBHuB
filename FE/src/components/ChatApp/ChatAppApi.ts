import * as API from '../../api/API';
import { NullableString, NullableNum } from '../../pages/FoodDetail/util/Type';

export const getCompletedParties = async () => await API.get(`/api/cps`);

export const setLog = (key: string, payload: MessageInfo) => {
  const localString = localStorage.getItem(key);

  if (!localString) localStorage.setItem(key, JSON.stringify([payload]));
  else {
    const localArr = JSON.parse(localString);
    localArr.push(payload);
    localStorage.setItem(key, JSON.stringify(localArr));
  }
};

export type MessageInfo = {
  message: string;
  userId: NullableNum;
  userName: NullableString;
};
