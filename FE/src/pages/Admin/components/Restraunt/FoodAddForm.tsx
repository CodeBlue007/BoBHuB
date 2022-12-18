import { Box, Typography, Select, MenuItem, TextField, TextFieldProps } from '@mui/material';
import { postFoodData } from '../../Api/foodApi';
import { style } from './FoodModal';
import { useRef } from 'react';
import styled from 'styled-components';
import type { FoodType } from './Foods';

interface FoodAddFormProps {
  handleClose: () => void;
  setFoodsData: () => void;
}

const categoryList = [
  { category: '한식' },
  { category: '일식' },
  { category: '중식' },
  { category: '치킨' },
  { category: '피자' },
];

const FoodAddForm = ({ handleClose, setFoodsData }: FoodAddFormProps) => {
  const name = useRef<TextFieldProps>();
  const distance = useRef<TextFieldProps>();
  const address = useRef<TextFieldProps>();
  const description = useRef<TextFieldProps>();

  const clickAddButtonHandler = async () => {
    const body: FoodType = {
      name: name.current?.value as string,
      distance: distance.current?.value as number,
      address: address.current?.value as string,
      description: description.current?.value as string,
      id: new Date().getTime().toString(),
      like: 0,
      category: '한식',
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
      <Div>
        <label htmlFor="Name">이름</label>
        <TextField required id="Name" label="Name" inputRef={name} type="text" />
      </Div>
      <Div>
        <label htmlFor="distance">거리</label>
        <TextField required id="distance" label="distance" inputRef={distance} />
      </Div>
      <Div>
        <label htmlFor="address">주소</label>
        <TextField required id="address" label="address" inputRef={address} />
      </Div>
      <Div>
        <label htmlFor="description">설명</label>
        <TextField required id="description" label="description" inputRef={description} />
      </Div>
      <Div>
        <label htmlFor="category">카테고리</label>
        <Select defaultValue="한식">
          {categoryList.map(({ category }) => {
            return <MenuItem value={category}>{category}</MenuItem>;
          })}
        </Select>
      </Div>

      <button onClick={clickAddButtonHandler}>추가</button>
    </Box>
  );
};

export default FoodAddForm;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
