import { useState, useEffect } from 'react';
import styled from 'styled-components';
import FoodTable from './FoodTable';
import { fetchFoodData } from '../Api/foodApi';

export type FoodType = {
  name: string;
  like: number;
  distance: number;
  address: string;
  description: string;
  id: string;
  category: string;
};

const Foods = () => {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const setFoodsData = async () => {
    const data: FoodType[] = await fetchFoodData();
    setFoods([...data]);
  };

  useEffect(() => {
    setFoodsData();
  }, []);
  return (
    <Div>
      <H2>식당 조회</H2>
      <FoodTable setFoodsData={setFoodsData} foods={foods} />
    </Div>
  );
};

export default Foods;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H2 = styled.h2`
  margin-bottom: 50px;
  margin-top: 50px;
`;
