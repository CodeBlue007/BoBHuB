import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Card } from '@mui/material';
import Comment from './components/Comment';
import CommentList from './components/CommentList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { commentStateType, shopStateType } from './types/Type';
import Content from './components/Content';
import { FlexContainer } from '../../styles/GlobalStyle';
import * as API from "../../api/API";

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

const baseURL = `http://localhost:5000/api`;

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
  const [commentState, setCommentState] = useState<commentStateType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);


  const getComment = async () => {
    const response = await axios.get('http://localhost:3001/comment');
    return response.data;
  };

  const getShop = async () => {
    const response = await axios.get('http://localhost:3001/shop');
    return response.data;
  };

  const updateComment = useCallback((comment:commentStateType) => {
    setCommentState((current) => [comment, ...current]);
  }, []);

  const deleteComment = useCallback((id:number) => {
    setCommentState((current) => current.filter((comments) => comments.commentId !== id));
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      const commentData = await API.get(`/api/shops`);
      // const shopData = await getShop();

      console.log('success', commentData);
      // console.log('success', shopData);

      // setCommentState(commentData);
      // setShop(shopData);
      // setLoading(false);
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
            updateComment={updateComment}
          />
          <CommentContainer>
            {commentState.map((comment) => (
              <CommentList
                key={comment.commentId}
                commentProp={comment}
                deleteComment={deleteComment}
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
