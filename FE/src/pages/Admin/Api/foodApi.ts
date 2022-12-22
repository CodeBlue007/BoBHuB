import { get, patch, post, delete as deleteApi } from '../../../api/API';

export interface PostShopBodyType {
  category: string;
  name: string;
  distance: number;
  address: string;
  description: string;
  menu: any;
}

export const postFoodData = async (body: PostShopBodyType) => {
  await post('/api/admin/shops', body);
};

export const deleteFoodData = async (id: string) => {
  await deleteApi(`/api/admin/shops/${id}`);
};

export const fetchFoodData = async () => {
  const foods = await get('/api/shops');
  return foods;
};

export const updateFoodData = async (id: string, body: PostShopBodyType) => {
  await patch(`/api/admin/shops/${id}`, body);
};
