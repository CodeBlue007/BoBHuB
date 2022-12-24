import { useEffect, useState } from 'react';
import * as API from '../../api/API';

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
  const [value, setValue] = useState('one');

  const handleChange = (event: React.SyntheticEvent, categoryNum: string) => {
    setValue(categoryNum);

    let cateValue = '';
    switch (categoryNum) {
      case 'one':
        cateValue = 'All';
        break;
      case 'two':
        cateValue = '한식';
        break;
      case 'three':
        cateValue = '양식';
        break;
      case 'four':
        cateValue = '일식';
        break;
      case 'five':
        cateValue = '분식';
        break;
      case 'six':
        cateValue = '중식';
        break;
      default:
        cateValue = 'All';
        return;
    }
    if (cateValue === 'All') {
      setCategoryFoodList(foodList);
    } else {
      const newData = foodList.filter(({ category }) => category === cateValue);
      setCategoryFoodList((prev) => [...newData]);
    }
  };

  // 식당전체조회 api
  const getFoodListAPI = async () => {
    const res = await API.get(`/api/shops`);
    console.log(res);
    setFoodList(res);
    setCategoryFoodList(res);
    setSearchList(res);
  };

  useEffect(() => {
    getFoodListAPI();
  }, []);

  useEffect(() => {
    const filtered = categoryFoodList.filter((shop) => {
      return shop.name.toUpperCase().includes(searchInput.toUpperCase());
    });
    setSearchList(filtered);
  }, [value, searchInput]);

  return (
    <Container>
      <NavBar />
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <CategoryBox>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example">
            <Tab value="one" label="All" />
            <Tab value="two" label="한식" />
            <Tab value="three" label="양식" />
            <Tab value="four" label="일식" />
            <Tab value="five" label="분식" />
            <Tab value="six" label="중식" />
          </Tabs>
        </Box>
      </CategoryBox>
      <CardContainer>
        {searchList?.map((x, i) => {
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
