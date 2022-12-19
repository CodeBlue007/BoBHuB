import type { FoodType } from './Foods';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { deleteFoodData } from '../../Api/foodApi';
import { Box, Typography, Button } from '@mui/material';
import { style } from './FoodModal';

interface FoodDetailFormProps {
  food: FoodType;
  setFoodsData: () => void;
  handleClose: () => void;
}
const initFoodDetail = {
  name: '',
  like: 0,
  distance: 0,
  address: '',
  description: '',
  id: '',
  category: '',
};

const FoodDetailForm = ({ food, setFoodsData, handleClose }: FoodDetailFormProps) => {
  const [foodDetail, setFoodDetail] = useState<FoodType>(initFoodDetail);
  useEffect(() => {
    setFoodDetail(food);
  }, [food]);

  const updateFoodData = (body: FoodType) => {
    return axios.put(`http://localhost:3001/foods/${food.id}`, body);
  };

  const clickUpdateBtn = async () => {
    await updateFoodData(foodDetail);
    setFoodsData();
    handleClose();
  };

  const clickDeleteBtn = async (id: string) => {
    await deleteFoodData(id);
    setFoodsData();
    handleClose();
  };
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        식당 정보
      </Typography>
      <label htmlFor="foodName">이름</label>
      <input type="text" value={food.name} />
      <label htmlFor="foodName">좋아요</label>
      <input type="text" value={food.like} />
      <label htmlFor="foodName">설명</label>
      <input type="text" value={food.description} />

      <Button onClick={clickUpdateBtn}>수정</Button>
      <Button
        onClick={() => {
          clickDeleteBtn(food.id);
        }}>
        삭제
      </Button>
    </Box>
  );
};

export default FoodDetailForm;
