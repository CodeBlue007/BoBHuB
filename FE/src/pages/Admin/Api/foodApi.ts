import { get, patch, post, delete as deleteApi } from '../../../api/API';

export interface PostShopBodyType {
  category: string;
  name: string;
  distance: number;
  address: string;
  description: string;
  menu: any;
}

export const postFoodData = async (body: FormData) => {
  await post('/api/admin/shops', body);
};

export const deleteFoodData = async (id: number) => {
  await deleteApi(`/api/admin/shops/${id}`);
};

export const fetchFoodData = async () => {
  const foods = await get('/api/shops');
  return foods;
};

export const updateFoodData = async (id: number, body: FormData) => {
  await patch(`/api/admin/shops/${id}`, body);
};
