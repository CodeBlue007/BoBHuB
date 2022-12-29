import { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Comment from './components/Comment';
import CommentList from './components/CommentList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { CommentState, ShopState, MenuState, initialShopState } from './util/Type';
import Content from './components/Content';
import { FlexContainer } from '../../styles/GlobalStyle';
import DetailSlider from './components/DetailSlider';
import { getComment, getShop, getMenu } from './foodDetailApi';
import { useParams } from 'react-router';

const Pagecontainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const CommentContainer = styled(FlexContainer)`
  flex-direction: column;
  margin: 20px;
`;

const FoodDetail = () => {
  const [shopState, setShopState] = useState<ShopState>(initialShopState);
  const [commentState, setCommentState] = useState<CommentState[]>([]);
  const [menuState, setMenuState] = useState<MenuState[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [update, setUpdated] = useState<boolean>(false);
  const scrollRef = useRef<HTMLElement>(null);
  const shopId = Number(useParams().id);

  const updateCommentState = useCallback(() => {
    setUpdated((current) => !current);
  }, []);

  const fetchCommentState = async (shopId: number) => {
    const commentState = await getComment(shopId);
    console.log(commentState);
    setCommentState(commentState);
  };

  const fetchShopState = async (shopId: number) => {
    const [shopState, menuState] = await Promise.all([getShop(shopId), getMenu(shopId)]);
    console.log('shopState', shopState);
    console.log('menuState', menuState);
    setShopState(shopState);
    setMenuState(menuState);
  };

  const fetchInitialData = async () => {
    await fetchCommentState(shopId);
    await fetchShopState(shopId);
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchCommentState(shopId);
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
          <Comment
            updateCommentState={updateCommentState}
            shopId={shopState.shopId}
            scrollRef={scrollRef}
          />
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
