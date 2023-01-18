import type { NullableString, NullableNum } from '../../pages/FoodDetail/util/foodDetailType';

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
