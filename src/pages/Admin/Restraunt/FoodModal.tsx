import { Box, Typography, Modal, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { FoodType } from './Foods';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FoodAddForm from './FoodAddForm';
import { deleteFoodData } from '../Api/foodApi';
export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface FoodDetailFormProps {
  food: FoodType | undefined;
  setFoodsData: () => void;
  handleClose: () => void;
}

const FoodDetailForm = ({ food, setFoodsData, handleClose }: FoodDetailFormProps) => {
  const [foodDetail, setFoodDetail] = useState({});
  useEffect(() => {
    setFoodDetail(() => {
      return food;
    });
  }, [food]);

  const updateFoodData = (body: any) => {
    return axios.put(`http://localhost:3001/foods/${food?.id}`, body);
  };

  const onChangeHandler = (event: SelectChangeEvent<string>) => {
    setFoodDetail((state) => {
      return {
        ...state,
        auth: event.target.value,
      };
    });
  };
  const clickUpdateBtn = async () => {
    await updateFoodData(foodDetail);
    setFoodsData();
    handleClose();
  };

  const clickDeleteBtn = async (id: string | undefined) => {
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
      <input type="text" value={food?.name} />
      <label htmlFor="foodName">좋아요</label>
      <input type="text" value={food?.like} />
      <label htmlFor="foodName">설명</label>
      <input type="text" value={food?.description} />

      <button onClick={clickUpdateBtn}>수정</button>
      <button
        onClick={() => {
          clickDeleteBtn(food?.id);
        }}>
        삭제
      </button>
    </Box>
  );
};

interface FoodModalProps {
  handleClose: () => void;
  open: boolean;
  food: FoodType | undefined;
  setFoodsData: () => void;
  btnState: string;
}

const FoodModal = ({ open, handleClose, food, setFoodsData, btnState }: FoodModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        {btnState === 'ADD' ? (
          <FoodAddForm handleClose={handleClose} setFoodsData={setFoodsData} />
        ) : (
          <FoodDetailForm handleClose={handleClose} setFoodsData={setFoodsData} food={food} />
        )}
      </Modal>
    </div>
  );
};

export default FoodModal;
