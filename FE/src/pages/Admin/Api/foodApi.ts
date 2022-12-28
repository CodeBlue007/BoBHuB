import { get, patch, post, delete as deleteApi } from '../../../api/API';

export const postFoodData = async (body: FormData) => {
  try {
    const res = await post('/api/admin/shops', body, 'imgPost');
    if (!res) {
      throw new Error('요청에 실패하였습니다.');
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteFoodData = async (id: number) => {
  try {
    const res = await deleteApi(`/api/admin/shops/${id}`);
    if (!res) {
      throw new Error('요청에 실패하였습니다.');
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchFoodData = async () => {
  try {
    const foods = await get('/api/shops');
    return foods;
  } catch (err) {
    console.log(err);
  }
};

export const updateFoodData = async (id: number, body: FormData) => {
  try {
    const res = await patch(`/api/admin/shops/${id}`, body);
    if (!res) {
      throw new Error('요청에 실패하였습니다.');
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateImg = async (id: number, body: FormData) => {
  try {
    const res = await post(`/api//admin/shops/${id}/image`, body, 'imgPost');
    if (!res) {
      throw new Error('요청에 실패하였습니다.');
    }
  } catch (err) {
    console.log(err);
  }
};
