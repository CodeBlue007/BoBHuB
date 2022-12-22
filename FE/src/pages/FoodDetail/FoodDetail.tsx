import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Card } from '@mui/material';
import Comment from './components/Comment';
import CommentList from './components/CommentList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { commentStateType, shopStateType, } from './types/Type';
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

const FoodDetail = () => {
  const [shopState, setShopState] = useState<shopStateType>({
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
    deletedAt : '',
  });
  const [commentState,setCommentState ] = useState<commentStateType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [update, setUpdated] = useState<boolean>(false);

  const updateComment = useCallback(()=>{
    setUpdated((current) => !current);
  }, []);

  const deleteComment = useCallback((id:number) => {
    setCommentState((current) => current.filter((comments) => comments.commentId !== id));
  },[]);

  const fetchCommentState = async()=> {
    const commentState = await API.get(`/api/comments?shopId=${5}`);
    console.log(commentState);
    setCommentState(commentState);
  }

  const fetchShopState = async()=> {
    const shopState = await API.get(`/api/shops/5`);
    setShopState(shopState);
  }

  const fetchInitialData = async () => {
    await fetchCommentState();
    await fetchShopState();
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(()=> {
    fetchCommentState();
  }, [update]);

  console.log()

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
                <p>주소 : {shopState.address}</p>
                <p>Distance : {shopState.distance}</p>
              </MenuCard>
            </div>
           <Content shop={shopState}/>
          </DetailContainer>
          <Comment
            updateComment={updateComment}
            shopId={shopState.shopId}
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
