import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import FoodTable from './FoodTable';

export type FoodType = {
  name: string;
  like: number;
  distance: number;
  address: string;
  description: string;
  id: string;
};

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const fetchFoodData = async () => {
    const res = await axios('http://localhost:3001/foods');
    const foods = await res.data;
    setFoods(() => {
      return foods;
    });
  };
  useEffect(() => {
    fetchFoodData();
  }, []);
  return (
    <Div>
      <H2>유저 조회</H2>
      <FoodTable fetchFoodData={fetchFoodData} foods={foods} />
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
