import {
  Box,
  Typography,
  Modal,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { postFoodData } from '../Api/foodApi';
import { style } from './FoodModal';
import { useRef } from 'react';

interface FoodAddFormProps {
  handleClose: () => void;
  setFoodsData: () => void;
}

const FoodAddForm = ({ handleClose, setFoodsData }: FoodAddFormProps) => {
  const name = useRef<TextFieldProps>();
  const distance = useRef<TextFieldProps>();
  const address = useRef<TextFieldProps>();
  const description = useRef<TextFieldProps>();

  const clickAddButtonHandler = async () => {
    const body = {
      name: name.current?.value as string,
      distance: distance.current?.value as number,
      address: address.current?.value as string,
      description: description.current?.value as string,
      id: Math.random().toString(),
      like: 0,
    };
    await postFoodData(body);
    setFoodsData();
    handleClose();
  };
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        식당 정보 입력
      </Typography>
      <div>
        <label htmlFor="Name">이름</label>
        <TextField required id="Name" label="Name" inputRef={name} type="text" />
      </div>
      <div>
        <label htmlFor="distance">거리</label>
        <TextField required id="distance" label="distance" inputRef={distance} />
      </div>
      <div>
        <label htmlFor="address">주소</label>
        <TextField required id="address" label="address" inputRef={address} />
      </div>
      <div>
        <label htmlFor="description">설명</label>
        <TextField required id="description" label="description" inputRef={description} />
      </div>

      <button onClick={clickAddButtonHandler}>추가</button>
    </Box>
  );
};

export default FoodAddForm;
