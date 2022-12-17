import axios from 'axios';
import { FoodType } from '../Restraunt/Foods';

export const postFoodData = async (body: FoodType) => {
  await axios
    .post('http://localhost:3001/foods', body)
    .then(() => console.log('post'))
    .catch((e) => console.log(e));
};

export const deleteFoodData = async (id: string) => {
  await axios
    .delete(`http://localhost:3001/foods/${id}`)
    .then(() => console.log('delete'))
    .catch((e) => console.log(e));
};

export const fetchFoodData = async () => {
  const res = await axios('http://localhost:3001/foods');
  const foods = await res.data;
  return foods;
};
