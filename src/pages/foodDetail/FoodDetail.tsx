import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { comment, shop } from './components/data';
import { Paper, Card, Button } from '@mui/material';
import SelectTags from './components/SelectTags';
import Comment from './components/Comment';
import CommentList from './components/CommentList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

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
  padding: 0;
  margin: 0;
`;

const DetailContainer = styled(FlexContainer)`
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
  padding: 20px;
`;

const MenuContainer = styled(FlexContainer)`
  width: 25vw;
`;

const SelectContainer = styled.div`
  height: inherit;
`;

const CommentContainer = styled(FlexContainer)`
  flex-direction: column;
  margin: 20px;
`;

const MenuCard = styled(Card)`
  width: 25vw;
  padding: 10px;
`;

const LikeButton = styled(Button)`
  width: 15vw;
`;


const FoodDetail = () => {

  const [people, setPeople] = useState<number>(2);
  const [duration, setDuration] = useState<number>(15);

  console.log(people);
  console.log(duration);



  useEffect(() => {
    console.log(shop);
    console.log(comment);
  }, []);

  return (
    <Pagecontainer>
      <NavBar />
      <DetailContainer>
        <Image image={'/img/chickfood.jpg'} />
        <ContentContainer>
          <Paper>
            <ShopTitle>{shop.name}</ShopTitle>
          </Paper>
          <MenuCard>
            <p>{shop.description}</p>
            <br/>
            <p>주소 : {shop.address}</p>
            <p>Distance : {shop.distance}</p>
          </MenuCard>
          <MenuContainer>
            <Paper>
              <ShopTitle>
                <p>메뉴({shop.categoryId})</p>
                <p>{shop.menu}</p>
                </ShopTitle>
            </Paper>
            <SelectContainer>
              <SelectTags type={'People'} value={people} setValue={setPeople} />
              <SelectTags type={'Duration'} value={duration} setValue={setDuration} />
            </SelectContainer>
          </MenuContainer>
          <LikeButton variant="contained">{`찜하기 ❤ : ${shop.like}`}</LikeButton>
        </ContentContainer>
      </DetailContainer>
      <Comment />
      <CommentContainer>
        {comment.map((comment) => (
          <CommentList commentProp={comment} />
        ))}
      </CommentContainer>
      <Footer />
    </Pagecontainer>
  );
};

export default FoodDetail;
