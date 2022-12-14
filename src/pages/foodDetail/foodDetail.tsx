import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { comment, shop } from './components/data';
import { Paper, Card, Button } from '@mui/material';
import SelectTags from './components/SelectTags';
import Comment from './components/Comment';
import CommentList from './components/CommentList';

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Pagecontainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DetailContainer = styled(FlexContainer)`
  border: 1px solid black;
  width: 60vw;
  margin-bottom: 50px;
`;

type imgType = {
  image: string;
};

const Image = styled.img<imgType>`
  width: 20vw;
  height: 20vw;
  background: url('${(props) => props.image}') center no-repeat;
  border-radius: 10px;
`;

const ContentContainer = styled(FlexContainer)`
  flex-direction: column;
  height: 80vh;
`;

const ShopTitle = styled.h2`
  font-size: 30px;
  padding: 0 20px;
`;

const MenuContainer = styled(FlexContainer)`
  width: 25vw;
`;

const SelectContainer = styled.div`
  height: inherit;
`;

const CommentContainer = styled(FlexContainer)`
  flex-direction: column;
  margin : 20px;
`;

const MenuCard = styled(Card)`
  width: 25vw;
  padding: 10px;
`

const LikeButton = styled(Button)`
  width : 15vw;
`

const FoodDetail = () => {
  useEffect(() => {
    console.log(shop);
    console.log(comment);
  }, []);

  const comment1 =  {
    commnetId: 3,
    userId: 1231635,
    shopId: 45613561,
    content: '댓글내용입니다',
    star: 5,
  }

  return (
    <Pagecontainer>
      <DetailContainer>
        <Image image={'/img/chickfood.jpg'} />
        <ContentContainer>
          <Paper>
            <ShopTitle>{shop.name}</ShopTitle>
          </Paper>
          <MenuCard>
            {shop.description}
          </MenuCard>
          <MenuContainer>
            <Paper>
              <ShopTitle>{shop.menu}</ShopTitle>
            </Paper>
            <SelectContainer>
              <SelectTags type={'People'} />
              <SelectTags type={'Duration'} />
            </SelectContainer>
          </MenuContainer>
          <LikeButton variant="contained">
            {`찜하기 ❤ : ${shop.like}`}
          </LikeButton>
        </ContentContainer>
      </DetailContainer>
      <Comment />
      <CommentContainer>
        <CommentList commentProp={comment1}/>
      </CommentContainer>
    </Pagecontainer>
  );
}

export default FoodDetail;
