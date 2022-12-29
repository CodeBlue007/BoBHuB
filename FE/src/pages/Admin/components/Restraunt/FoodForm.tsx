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
import {
  deleteFoodData,
  postFoodData,
  fetchFoodData,
  updateFoodData,
  updateImg,
} from '../../Api/foodApi';
import { style } from './FoodModal';
import { useRef, useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import type { FoodType } from './Foods';
import { patch, post, get, delete as deleteApi } from '../../../../api/API';

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
  const [shopImg, setShopImg] = useState<Blob[]>([]);
  const [shopImgURL, setShopImgURL] = useState<string>('');
  const [menuImg, setMenuImg] = useState<Blob[]>([]);
  const [menuImgURL, setMenuImgURL] = useState<string>('');
  const [categoryList, setCategoryList] = useState<[]>([]);

  useEffect(() => {
    (async () => {
      const categories = await get('/api/categories');
      setCategoryList(categories);
    })();
    if (btnState === 'UPDATE') {
      setShopImgURL(food.shopPicture);
      setMenuImgURL(food.menu);
    }
  }, []);

  const setFormData = () => {
    const formData = new FormData();
    formData.append('name', name.current?.value as string);
    formData.append('distance', distance.current?.value as string);
    formData.append('address', address.current?.value as string);
    formData.append('description', description.current?.value as string);
    formData.append('category', category.current?.value as string);
    if (btnState === 'ADD') {
      shopImg.forEach((img) => {
        formData.append('shopPicture', img);
      });
      menuImg.forEach((img) => {
        formData.append('menu', img);
      });
    }
    return formData;
  };
  const setImgFormData = () => {
    const formData = new FormData();
    shopImg.forEach((img) => {
      formData.append('shopPicture', img);
    });
    menuImg.forEach((img) => {
      formData.append('menu', img);
    });
    return formData;
  };

  const clickUpdateBtn = async (id: number) => {
    const formData = setFormData();
    const imgFormData = setImgFormData();
    await updateFoodData(id, formData);
    if (shopImg.length > 0 || menuImg.length > 0) {
      await updateImg(id, imgFormData);
    }
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
    URL.revokeObjectURL(shopImgURL);
    URL.revokeObjectURL(menuImgURL);
    handleClose();
  };

  const changeShopImgInput = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as FileList);
    const shopImgURL = URL.createObjectURL(files[0]);
    setShopImgURL(shopImgURL);
    setShopImg(files);
    console.log(shopImgURL);
    console.log(files);
  };
  const changeMenuImgInput = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as FileList);
    const menuImgURL = URL.createObjectURL(files[0]);
    setMenuImgURL(menuImgURL);
    setMenuImg(files);
    console.log(menuImgURL);
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
              <TextField
                required
                id="category"
                inputRef={category}
                defaultValue={btnState === 'UPDATE' ? food.category : ''}
              />
              {/* <Select
                defaultValue={btnState === 'UPDATE' ? food.category : '한식'}
                inputRef={category}>
                {categoryList.map(({ category }) => {
                  return <MenuItem value={category}>{category}</MenuItem>;
                })}
              </Select> */}
            </Div>
            <Div>
              <Button variant="contained" component="label">
                식당 사진 업로드
                <input type="file" hidden onChange={changeShopImgInput} />
              </Button>
              <Button variant="contained" component="label" sx={{ marginTop: '10px' }}>
                메뉴 사진 업로드
                <input type="file" hidden onChange={changeMenuImgInput} />
              </Button>
            </Div>
          </FormSection>
          <SideSection>
            <ImgWrapper>
              <Img src={shopImgURL} alt="img" />
            </ImgWrapper>
            <ImgWrapper>
              <Img src={menuImgURL} alt="img" />
            </ImgWrapper>
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
  width: 200px;
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  margin: 10px;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
`;

const FormSection = styled.div`
  width: 300px;
`;

const SideSection = styled.div`
  padding: 30px 0 30px 30px;
`;
