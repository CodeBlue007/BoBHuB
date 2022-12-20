import axios from 'axios';
import type { FoodType } from '../components/Restraunt/Foods';
export const axiosInstance = axios.create({ baseURL: 'http://localhost:5000' });

export interface PostShopBodyType {
  category: string;
  name: string;
  distance: number;
  address: string;
  description: string;
}

export const postFoodData = async (body: PostShopBodyType) => {
  try {
    const res = await axiosInstance.post('/foods', body);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFoodData = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/foods/${id}`);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const fetchFoodData = async () => {
  try {
    const res = await axiosInstance('/api/shops');
    const foods = await res.data;
    return foods;
  } catch (error) {
    console.log(error);
  }
};

export const updateFoodData = async (id: string, body: PostShopBodyType) => {
  try {
    const res = await axiosInstance.patch(`/foods/${id}`, body);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
