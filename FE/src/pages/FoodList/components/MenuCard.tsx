import styled from 'styled-components';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useNavigate } from 'react-router-dom';
import Gathering from './Gathering';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../../socket/SocketContext';
import { getActivePartyList } from '../../../store/partySlice';

type ShopListProps = {
  name: string; //식당명
  category: string;
  description: string;
  avgStar: number;
  food: shopMenuList[];
  shopId: number;
};

type shopMenuList = {
  name: string;
  picture: string;
};

const defaultProps: ShopListProps = {
  name: '식당이름1',
  category: '한식',
  description: '식당설명란입니다.',
  avgStar: 4.5,
  food: [{ name: '메뉴', picture: 'url' }],
  shopId: 11,
};

const MenuCard = ({ name, category, description, avgStar, food, shopId }: ShopListProps) => {
  const navigate = useNavigate();
  const activePartyList = useSelector(
    (state: RootState) => state.partySliceReducer.activePartyList,
  );
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const goToFoodDetailPage = () => {
    navigate(`/foodlist/${shopId}`);
  };
  const [gathering, setGatherting] = useState(false);
  useEffect(() => {
    socket.on('joinSuccess', () => dispatch(getActivePartyList()));
    socket.on('leaveSuccess', () => dispatch(getActivePartyList()));
  }, []);

  useEffect(() => {
    if (
      activePartyList
        // .filter((party) => party.likedNum !== party.partyLimit)
        .find((party) => party.shopId === shopId)
    ) {
      setGatherting(true);
    } else {
      setGatherting(false);
    }
  }, [activePartyList]);
  return (
    <Container onClick={goToFoodDetailPage}>
      <CardTitle>
        {name}
        <CardCategory>{category}</CardCategory>
      </CardTitle>
      <CardImage>
        {gathering && <Gathering />}
        {food ? (
          <img width="330px" height="200px" src={food[0].picture} alt="restaurant" />
        ) : (
          <NoneFoodImage>등록된 사진이 없습니다.</NoneFoodImage>
        )}
      </CardImage>
      <CardDescription>{`" ${description} "`}</CardDescription>
      <MenuList>
        {food
          ? food.map((menu, idx) => {
              const { name, picture } = menu;
              return <Menu key={`${name}-${name}-${idx}`}>{name}</Menu>;
            })
          : ''}
      </MenuList>
      <Line />
      <StarContainer>
        {Number(avgStar) ? (
          <>
            <StarRateIcon
              sx={{ bottom: '23px', right: '86px', position: 'absolute', color: '#faaf00' }}
            />
            <StarAvg>{Number(avgStar).toFixed(1)}</StarAvg>
            <StarTotal>/5</StarTotal>
          </>
        ) : (
          ''
        )}
      </StarContainer>
    </Container>
  );
};

MenuCard.defaultProps = defaultProps;

export default MenuCard;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  width: 400px;
  height: 470px;
  box-sizing: border-box;
  padding-left: 28px;
  padding-right: 28px;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const CardTitle = styled.h5`
  font-weight: bold;
  font-size: ${(props) => props.theme.font.size.containerTitle};
  line-height: 26px;
  color: ${(props) => props.theme.font.color.black};
  margin-top: 25px;
  margin-bottom: 10px;
`;

const CardCategory = styled.span`
  font-weight: lighter;
  font-size: 12px;
  margin-left: 5px;
`;

const CardImage = styled.div``;

const CardDescription = styled.p`
  color: ${(props) => props.theme.font.color.description};
  font-size: ${(props) => props.theme.font.size.normal};
  margin: 12px 0;
  line-height: 20px;
`;

const MenuList = styled.div``;
const Menu = styled.li`
  font-size: ${(props) => props.theme.font.size.normal};
  line-height: 18px;
`;

const Line = styled.div`
  width: 400px;
  height: 1px;
  background-color: ${(props) => props.theme.colors.lightGray};
  position: absolute;
  left: 0;
  bottom: 60px;
`;

const StarContainer = styled.div`
  display: flex;
`;

const StarAvg = styled.span`
  position: absolute;
  bottom: 25px;
  font-weight: bold;
  right: 60px;
`;

const StarTotal = styled.span`
  position: absolute;
  bottom: 25px;
  color: ${(props) => props.theme.font.color.description};
  right: 44px;
  font-weight: bold;
  font-size: 16px;
`;

const NoneFoodImage = styled.div`
  width: 330px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.innerContainer};
`;
