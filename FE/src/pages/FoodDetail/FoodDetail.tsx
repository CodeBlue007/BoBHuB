import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Card } from '@mui/material';
import Comment from './components/Comment';
import CommentList from './components/CommentList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { commentStateType, shopStateType, menuStateType } from './types/Type';
import Content from './components/Content';
import { FlexContainer } from '../../styles/GlobalStyle';
import DetailSlider from "./components/DetailSlider";
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
  const [memuState, setMenuState] = useState<menuStateType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [update, setUpdated] = useState<boolean>(false);

  const updateCommentState = useCallback(()=>{
    setUpdated((current) => !current);
  }, []);

  // 1.서버요청 > 프론트 UI 업데이트 (요청에 따른 결과 필터링) > JS 
  // 2.서버요청 > 상위 state에서 댓글 rendering  어떤게 맞을까여 > React 
  // 서비스 요구사항에 따라 다름. 
  // 1번 > 최신화는 덜되지만 빠름
  // 2번 > 갱신가능, 부하

  const fetchCommentState = async()=> {
    const commentState = await API.get(`/api/comments?shopId=${5}`);
    console.log(commentState);
    setCommentState(commentState);
  }

  const fetchShopState = async()=> {
    const fetchShop = async() => await API.get(`/api/shops/5`);
    const fetchMenu = async() => await API.get(`/api/food?shopId=5`);

    const [shopState, menuState] = await Promise.all([fetchShop(), fetchMenu()]);
    // const settledResult = await Promise.allSettled([fetchShop(), fetchMenu()]);
    //status 2가지라 결과값이 다름 > typeGuard 해줘야함.
    console.log(shopState, memuState);
    setShopState(shopState);
    setMenuState(memuState);
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


  return (
    <Pagecontainer>
      {isLoading ? (
        'isLoading...'
      ) : (
        <>
          <NavBar />
          <DetailContainer>
            <div>
              <DetailSlider/>
              <MenuCard>
                <p>주소 : {shopState.address}</p>
                <p>Distance : {shopState.distance}</p>
              </MenuCard>
            </div>
           <Content shop={shopState}/>
          </DetailContainer>
          <Comment
            updateCommentState={updateCommentState}
            shopId={shopState.shopId}
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
