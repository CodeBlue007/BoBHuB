import axios from 'axios';
import type { FoodType } from '../components/Restraunt/Foods';
export const axiosInstance = axios.create({ baseURL: 'http://localhost:3001' });

export const postFoodData = async (body: FoodType) => {
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
    const res = await axiosInstance('/foods');
    const foods = await res.data;
    return foods;
  } catch (error) {
    console.log(error);
  }
};

export const updateFoodData = async (id: string, body: FoodType) => {
  try {
    const res = await axiosInstance.patch(`/foods/${id}`, body);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};