import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  TextFieldProps,
  Button,
} from '@mui/material';
import { postFoodData } from '../../Api/foodApi';
import { style } from './FoodModal';
import { useRef, MouseEvent, useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import type { FoodType } from './Foods';
import { fetchCategoryList } from '../../Api/categoryApi';

interface FoodAddFormProps {
  handleClose: () => void;
  setFoodsData: () => void;
}

const FoodAddForm = ({ handleClose, setFoodsData }: FoodAddFormProps) => {
  const name = useRef<TextFieldProps>();
  const distance = useRef<TextFieldProps>();
  const address = useRef<TextFieldProps>();
  const description = useRef<TextFieldProps>();
  const category = useRef<TextFieldProps>();
  const [uploadPhoto, setUploadPhoto] = useState<File>();
  const [categoryList, setCategoryList] = useState<[]>([]);

  useEffect(() => {
    (async () => {
      const categories = await fetchCategoryList();
      setCategoryList(categories);
    })();
  }, []);

  const clickAddButtonHandler = async () => {
    const body: FoodType = {
      name: name.current?.value as string,
      distance: distance.current?.value as number,
      address: address.current?.value as string,
      description: description.current?.value as string,
      id: new Date().getTime().toString(),
      like: 0,
      category: category.current?.value as string,
    };
    await postFoodData(body);
    setFoodsData();
    handleClose();
  };
  return (
    <Box sx={style}>
      <form encType="multipart/form-data" action="">
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
          <Select defaultValue="한식" inputRef={category}>
            {categoryList.map(({ category }) => {
              return <MenuItem value={category}>{category}</MenuItem>;
            })}
          </Select>
        </Div>
        <Div>
          <Button variant="contained" component="label">
            식당 사진 업로드
            <input
              type="file"
              hidden
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setUploadPhoto((event.target.files as FileList)[0]);
              }}
            />
          </Button>
        </Div>
        <Button onClick={clickAddButtonHandler}>추가</Button>
      </form>
    </Box>
  );
};

export default FoodAddForm;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
