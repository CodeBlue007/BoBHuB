import { axiosInstance } from './foodApi';

export const fetchCategoryList = async () => {
  try {
    const res = await axiosInstance('/category');
    const categories = await res.data;
    return categories;
  } catch (error) {
    console.log(error);
  }
};
