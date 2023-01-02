import { get } from '../../../api/API';
export const fetchCategoryList = async () => {
  const categories = await get('/api/categories');
  return categories;
};
