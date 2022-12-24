import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  TextFieldProps,
  Button,
  ButtonGroup,
} from '@mui/material';
import { postFoodData, updateFoodData, deleteFoodData } from '../../Api/foodApi';
import { style } from './FoodModal';
import { useRef, useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import type { FoodType } from './Foods';
import { fetchCategoryList } from '../../Api/categoryApi';

interface FoodAddFormProps {
  handleClose: () => void;
  setFoodsData: () => void;
  btnState: string;
  food: FoodType;
}

const FoodForm = ({ handleClose, setFoodsData, btnState, food }: FoodAddFormProps) => {
  const name = useRef<HTMLInputElement>(null);
  const distance = useRef<TextFieldProps>();
  const address = useRef<TextFieldProps>();
  const description = useRef<TextFieldProps>();
  const category = useRef<TextFieldProps>();
  const shopImage = useRef<HTMLInputElement>(null);
  const [uploadPhoto, setUploadPhoto] = useState<Blob[]>([]);
  const [preViewImgURL, setPreViewImgURL] = useState<string[]>([]);
  const [preViewImgIndex, setPreViewImgIndex] = useState(0);
  const [categoryList, setCategoryList] = useState<[]>([]);

  useEffect(() => {
    (async () => {
      const categories = await fetchCategoryList();
      setCategoryList(categories);
    })();
  }, []);

  useEffect(() => {
    setPreViewImgIndex(0);
  }, [uploadPhoto]);

  const setFormData = () => {
    const formData = new FormData();
    formData.append('name', name.current?.value as string);
    formData.append('distance', distance.current?.value as string);
    formData.append('address', address.current?.value as string);
    formData.append('description', description.current?.value as string);
    formData.append('category', '한식');
    uploadPhoto.forEach((img) => {
      formData.append('shopPicture', img);
    });
    return formData;
  };

  const clickUpdateBtn = async (id: number) => {
    const formData = setFormData();
    await updateFoodData(id, formData);
    setFoodsData();
    handleClose();
  };

  const clickDeleteBtn = async (id: number) => {
    await deleteFoodData(id);
    setFoodsData();
    handleClose();
  };

  const clickAddButtonHandler = async () => {
    const body = setFormData();
    await postFoodData(body);
    setFoodsData();
    handleClose();
  };

  const changeImgInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as FileList);
    const URL = files.reduce((acc: string[], cur) => {
      acc.push(window.URL.createObjectURL(cur));
      return acc;
    }, []);
    setPreViewImgURL(URL);
    setUploadPhoto(files);
    console.log(URL);
    console.log(files);
  };
  return (
    <Box sx={style}>
      <form encType="multipart/form-data" action="">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          식당 정보
        </Typography>
        <Flex>
          <FormSection>
            <Div>
              <label htmlFor="Name">이름</label>
              <TextField
                required
                id="Name"
                inputRef={name}
                defaultValue={btnState === 'UPDATE' ? food.name : ''}
              />
            </Div>
            <Div>
              <label htmlFor="distance">거리</label>
              <TextField
                required
                id="distance"
                inputRef={distance}
                defaultValue={btnState === 'UPDATE' ? food.distance : ''}
              />
            </Div>
            <Div>
              <label htmlFor="address">주소</label>
              <TextField
                required
                id="address"
                inputRef={address}
                defaultValue={btnState === 'UPDATE' ? food.address : ''}
              />
            </Div>
            <Div>
              <label htmlFor="description">설명</label>
              <TextField
                required
                id="description"
                inputRef={description}
                defaultValue={btnState === 'UPDATE' ? food.description : ''}
              />
            </Div>
            <Div>
              <label htmlFor="category">카테고리</label>
              <Select
                defaultValue={btnState === 'UPDATE' ? food.category : '한식'}
                inputRef={category}>
                {categoryList.map(({ category }) => {
                  return <MenuItem value={category}>{category}</MenuItem>;
                })}
              </Select>
            </Div>
            <Div>
              <Button variant="contained" component="label">
                식당 사진 업로드
                <input
                  ref={shopImage}
                  type="file"
                  hidden
                  onChange={changeImgInputHandler}
                  multiple
                />
              </Button>
            </Div>
          </FormSection>
          <SideSection>
            <ImgWrapper>
              <Img src={preViewImgURL[preViewImgIndex]} alt="img" />
            </ImgWrapper>
            <button
              onClick={() => {
                setPreViewImgIndex((index) => {
                  if (preViewImgURL.length - 1 > index) {
                    return index + 1;
                  }
                  return 0;
                });
              }}>
              다음사진
            </button>
          </SideSection>
        </Flex>
        <Div>
          {btnState === 'ADD' && (
            <Button variant="outlined" onClick={clickAddButtonHandler}>
              추가
            </Button>
          )}
          {btnState === 'UPDATE' && (
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={() => clickUpdateBtn(food.shopId)}>수정</Button>
              <Button
                onClick={() => {
                  clickDeleteBtn(food.shopId);
                }}>
                삭제
              </Button>
            </ButtonGroup>
          )}
        </Div>
      </form>
    </Box>
  );
};

export default FoodForm;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Flex = styled.div`
  display: flex;
`;

const ImgWrapper = styled.div`
  width: 300px;
  height: 300px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const Img = styled.img`
  width: 300px;
  height: 300px;
`;

const FormSection = styled.div`
  width: 300px;
`;

const SideSection = styled.div`
  padding: 30px 0 30px 30px;
`;
