import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Paper, Card, Button } from '@mui/material';
import SelectTags from './components/SelectTags';
import Comment from './components/Comment';
import CommentList from './components/CommentList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { commentStateType, shopStateType } from './types/Type';

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

const ImageContainer = styled.div`
  width: 20vw;
  height: 15vw;
  overflow: hidden;
  padding: 10px;
`;

const Image = styled.img<imgType>`
  background: url('${(props) => props.image}') no-repeat center ;
  width: inherit;
  height: inherit;
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
  width: 20vw;
  padding: 10px;
`;

const LikeButton = styled(Button)`
  width: 15vw;
`;



const FoodDetail = () => {
  const [shop, setShop] = useState<shopStateType>({
    "shopId" : 0,
    "categoryId" : 0,
    "name" : '',
    "distance" : 0,
    "address": '',
    "menu": '',
    "shopPicture": '',
    "like" : 0,
    "description" : '',
  });
  const [people, setPeople] = useState<number>(2);
  const [duration, setDuration] = useState<number>(15);
  const [starValue, setStarValue] = useState<number | null>(5);
  const [likeAll, setlikeAll] = useState<number>(0);
  const [isClicked, setClicked] = useState<boolean>(false);
  const [commentState, setCommnetState] = useState<commentStateType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isClicked) {
      alert('이미 찜한 식당입니다.');
      return;
    }
    setClicked(true);
    setlikeAll((current) => current + 1);
  };

  const getComment = async() => {
    const response = await axios.get("http://localhost:3001/comment");
    return response.data;
  }

  const getShop = async() => {
    const response = await axios.get("http://localhost:3001/shop");
    return response.data;
  }

  useEffect(() => {
    const fetchData = async() => {
      const commentData = await getComment();
      const shopData = await getShop();

      console.log("success" ,commentData);
      console.log("success" ,shopData);

      setCommnetState(commentData);
      setShop(shopData);
      setlikeAll(shopData.like);
      setLoading(false);
    }

    fetchData();
  }, []);


  return (
    <Pagecontainer>
      {isLoading? "isLoading..." : (
        <>
        <NavBar />
        <DetailContainer>
          <div>
            <ImageContainer>
              <Image image={'/img/chickfood.jpg'} />
            </ImageContainer>
            <MenuCard>
              <p>주소 : {shop?.address}</p>
              <p>Distance : {shop?.distance}</p>
            </MenuCard>
          </div>
          <ContentContainer>
            <Paper>
              <ShopTitle>{shop?.name}</ShopTitle>
            </Paper>
            <MenuCard>
              <p>{shop.description}</p>
            </MenuCard>
            <MenuContainer>
              <Paper>
                <ShopTitle>
                  <p>메뉴({shop?.categoryId})</p>
                  <p>{shop?.menu}</p>
                </ShopTitle>
              </Paper>
              <SelectContainer>
                <SelectTags type={'People'} value={people} setValue={setPeople} />
                <SelectTags type={'Duration'} value={duration} setValue={setDuration} />
              </SelectContainer>
            </MenuContainer>
            <LikeButton
              variant="contained"
              onClick={handleClick}>{`찜하기 ❤ : ${likeAll}`}</LikeButton>
          </ContentContainer>
        </DetailContainer>
        <Comment
          starValue={starValue}
          setStarValue={setStarValue}
          setCommentState={setCommnetState}
        />
        <CommentContainer>
          {commentState.map((comment) => (
            <CommentList
              key={comment.commentId}
              commentProp={comment}
              setCommentState={setCommnetState}
            />
          ))}
        </CommentContainer>
        <Footer />
        </>
        )}
    </Pagecontainer>
  );
};

export default FoodDetail;
