import axios from 'axios';
import { FoodType } from '../Restraunt/Foods';

export const postFoodData = async (body: FoodType) => {
  await axios
    .post('http://localhost:3001/foods', body)
    .then(() => console.log('post'))
    .catch((e) => console.log(e));
};

export const deleteFoodData = async (id: string | undefined) => {
  await axios.delete(`http://localhost:3001/foods/${id}`);
};
