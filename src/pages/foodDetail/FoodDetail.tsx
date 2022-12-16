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
import Content from './components/Content';
import { FlexContainer } from '../../styles/GlobalStyle';



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
  background: url('${(props) => props.image}') no-repeat center;
  width: inherit;
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



const FoodDetail = () => {
  const [shop, setShop] = useState<shopStateType>({
    shopId: 0,
    category: '',
    name: '',
    distance: 0,
    address: '',
    menu: '',
    shopPicture: '',
    like: 0,
    description: '',
    createdAt: '',
    updatedAt: '',
  });
  const [starValue, setStarValue] = useState<number | null>(5);
  const [commentState, setCommnetState] = useState<commentStateType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);


  const getComment = async () => {
    const response = await axios.get('http://localhost:3001/comment');
    return response.data;
  };

  const getShop = async () => {
    const response = await axios.get('http://localhost:3001/shop');
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const commentData = await getComment();
      const shopData = await getShop();

      console.log('success', commentData);
      console.log('success', shopData);

      setCommnetState(commentData);
      setShop(shopData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Pagecontainer>
      {isLoading ? (
        'isLoading...'
      ) : (
        <>
          <NavBar />
          <DetailContainer>
            <div>
              <ImageContainer>
                <Image image={'/img/chickfood.jpg'} />
              </ImageContainer>
              <MenuCard>
                <p>주소 : {shop.address}</p>
                <p>Distance : {shop.distance}</p>
              </MenuCard>
            </div>
           <Content shop={shop}/>
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
