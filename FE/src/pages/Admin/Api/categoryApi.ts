import { axiosInstance } from './foodApi';

export const fetchCategoryList = async () => {
  try {
    const res = await axiosInstance('/api/categories');
    const categories = await res.data;
    return categories;
  } catch (error) {
    console.log(error);
  }
};
