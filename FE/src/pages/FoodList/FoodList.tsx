import { useEffect, useState } from 'react';
import * as API from '../../api/API';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';

import MenuCard from './components/MenuCard';
import Search from './components/Search';
import NavBar from '../../components/NavBar';

const FoodList = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [categoryFoodList, setCategoryFoodList] = useState([
    {
      name: '',
      category: '',
      description: '',
      food: [{ name: '', picture: '' }],
      avgStar: 0,
      shopId: 0,
    },
  ]); //카테고리별 식당데이터
  const [foodList, setFoodList] = useState([]); //전체 식당데이터
  const [searchList, setSearchList] = useState([
    {
      name: '',
      category: '',
      description: '',
      food: [{ name: '', picture: '' }],
      avgStar: 0,
      shopId: 0,
    },
  ]); //검색데이터
  const [curCategory, setCategory] = useState('ALL');
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 9;
  const totalPage = Math.ceil(searchList.length / 9);
  const [getCategories, setGetCategories] = useState([]);

  const handleCategoryChange = (
    event: React.SyntheticEvent,
    categoryVal: 'ALL' | '한식' | '일식' | '분식' | '중식' | '베이커리' | '카페',
  ) => {
    setCategory(categoryVal);
    setPage(1);
    if (categoryVal === 'ALL') {
      setCategoryFoodList(foodList);
    } else {
      const newData = foodList.filter(({ category }) => category === categoryVal);
      setCategoryFoodList((prev) => [...newData]);
    }
  };

  // 식당전체조회 api
  const getFoodListAPI = async () => {
    const res = await API.get(`/api/shops`);
    setFoodList(res);
    setCategoryFoodList(res);
    setSearchList(res);
  };

  const getCategoriesAPI = async () => {
    const res = await API.get(`/api/categories`);
    setGetCategories(res.reverse());
  };

  const handlePageUpdate = (e: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    getFoodListAPI();
    setCategory('ALL');
    getCategoriesAPI();
  }, []);
  console.log(getCategories);
  useEffect(() => {
    const filtered = categoryFoodList.filter((shop) => {
      return shop.name.toUpperCase().includes(searchInput.toUpperCase());
    });
    setSearchList(filtered);
  }, [curCategory, searchInput]);

  return (
    <Container>
      <NavBar />
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <CategoryBox>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={curCategory}
            onChange={handleCategoryChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example">
            <Tab value="ALL" label="ALL" />
            {getCategories.map((cate, i) => {
              const { category } = cate;
              return <Tab value={category} label={category} />;
            })}
          </Tabs>
        </Box>
      </CategoryBox>
      <CardContainer>
        {searchList?.slice(offset, offset + 9).map((x, i) => {
          const { name, category, description, food, avgStar, shopId } = x;
          return (
            <MenuCard
              name={name}
              category={category}
              description={description}
              food={food}
              avgStar={avgStar}
              shopId={shopId}
              key={`menucard-${i}`}
            />
          );
        })}
      </CardContainer>
      <Stack spacing={2}>
        <Pagination
          sx={{ paddingTop: '50px' }}
          color="primary"
          count={totalPage}
          page={page}
          shape="rounded"
          showFirstButton
          showLastButton
          onChange={handlePageUpdate}
        />
      </Stack>
    </Container>
  );
};

export default FoodList;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;
  background-color: ${({ theme }) => theme.colors.container};
`;

const CategoryBox = styled.div`
  margin-bottom: 40px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 400px);
  grid-column-gap: 18px;
  grid-row-gap: 32px;
`;
