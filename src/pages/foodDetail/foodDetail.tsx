import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { comment, shop } from './components/comment';
import { Paper, Typography,Card} from '@mui/material';
import SelectTags from './components/SelectTags';

const Pagecontainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DetailContainer = styled.div`
  display: flex;
  border: 1px solid black;
  align-items: center;
  justify-content: space-around;
  width: 70vw;

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
  height: 50vh;
`;

const ShopTitle = styled.h2`
font-size : 70px;
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
          <Paper 
          sx={{
            width: 150,
            textAlign : "center",
            padding: 2,
          }}
          ><Typography variant="h4">{shop.name}</Typography></Paper>
          <Card sx={{
            padding : 2,
            width : 400,}}>{shop.description}</Card>
          <SelectTags type={"People"}/>
          <SelectTags type={"Duration"}/>
        </ContentContainer>
      </DetailContainer>
    </Pagecontainer>
  );
}

export default FoodDetail;
