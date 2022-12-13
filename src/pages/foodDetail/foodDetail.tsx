import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { comment, shop } from './components/data';
import { Paper, Typography, Card, TextField, Button } from '@mui/material';
import SelectTags from './components/SelectTags';
import Comment from './components/Comment';
import CommentList from './components/CommentList';

const Pagecontainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DetailContainer = styled.div`
  display: flex;
  border: 1px solid black;
  align-items: center;
  justify-content: space-around;
  width: 60vw;
  margin-bottom: 50px;
`;

type imgType = {
  image: string;
};

const Image = styled.img<imgType>`
  width: 400px;
  height: 400px;
  background: url('${(props) => props.image}') center no-repeat;
  border-radius: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 80vh;
`;

const ShopTitle = styled.h2`
  font-size: 30px;
  padding: 0 20px;
`;

const MenuContainer = styled.div`
display : flex;
align-items: center;
width: 400px;
justify-content: space-around;
`;

const SelectContainer = styled.div`
height : inherit;

`;

function FoodDetail() {
  useEffect(() => {
    console.log(shop);
    console.log(comment);
  }, []);

  return (
    <Pagecontainer>
      <DetailContainer>
        <Image image={'/img/chickfood.jpg'} />
        <ContentContainer>
          <Paper>
            <ShopTitle>{shop.name}</ShopTitle>
          </Paper>
          <Card
            sx={{
              padding: 2,
              width: 400,
            }}>
            {shop.description}
          </Card>
          <MenuContainer>
            <Paper>
              <ShopTitle>{shop.menu}</ShopTitle>
            </Paper>
            <SelectContainer>
              <SelectTags type={'People'} />
              <SelectTags type={'Duration'} />
            </SelectContainer>
          </MenuContainer>
          <Button variant="contained" sx={{ width: 200 }}>
            찜 ❤
          </Button>
        </ContentContainer>
      </DetailContainer>
      <Comment />
      <CommentList />
    </Pagecontainer>
  );
}

export default FoodDetail;
