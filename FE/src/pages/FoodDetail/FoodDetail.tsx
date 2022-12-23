import { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Card } from '@mui/material';
import Comment from './components/Comment';
import CommentList from './components/CommentList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { commentStateType, shopStateType, menuStateType, initialShopState } from './types/Type';
import Content from './components/Content';
import { FlexContainer } from '../../styles/GlobalStyle';
import DetailSlider from './components/DetailSlider';
import * as API from '../../api/API';

const Pagecontainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin : 0;
`;

const DetailContainer = styled(FlexContainer)`
  width: 60vw;
  margin-bottom: 50px;
  border: 1px solid black;
  flex-direction: column;
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
  const [shopState, setShopState] = useState<shopStateType>(initialShopState);
  const [commentState, setCommentState] = useState<commentStateType[]>([]);
  const [menuState, setMenuState] = useState<menuStateType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [update, setUpdated] = useState<boolean>(false);
  const scrollRef = useRef<HTMLElement>(null);


  const updateCommentState = useCallback(() => {
    setUpdated((current) => !current);
  }, []);

  const fetchCommentState = async () => {
    const commentState = await API.get(`/api/comments?shopId=${5}`);
    console.log(commentState);
    setCommentState(commentState);
  };

  const fetchShopState = async () => {
    const fetchShop = async () => await API.get(`/api/shops/5`);
    const fetchMenu = async () => await API.get(`/api/food?shopId=5`);

    const [shopState, menuState] = await Promise.all([fetchShop(), fetchMenu()]);
    console.log('shopState', shopState);
    console.log('menuState', menuState);
    setShopState(shopState);
    setMenuState(menuState);
  };

  const fetchInitialData = async () => {
    await fetchCommentState();
    await fetchShopState();
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchCommentState();
  }, [update]);

  const makeImgArr = () => {
    const imgArr = [];
    imgArr.push(shopState.shopPicture);
    imgArr.push(shopState.menu);
    menuState.forEach((menu) => {
      imgArr.push(menu.picture);
    });

    return [...imgArr];
  };

  return (
    <Pagecontainer ref={scrollRef}>
      {isLoading ? (
        'isLoading...'
      ) : (
        <>
          <NavBar />
          <DetailSlider imageArr={makeImgArr()} />
            {<Content shop={shopState} />}
          <Comment updateCommentState={updateCommentState} shopId={shopState.shopId} scrollRef={scrollRef}/>
          <CommentContainer>
            {commentState.map((comment) => (
              <CommentList
                key={comment.commentId}
                commentProp={comment}
                updateCommentState={updateCommentState}
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
