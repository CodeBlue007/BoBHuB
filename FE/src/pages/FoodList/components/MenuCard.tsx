import styled from 'styled-components';
import StarRateIcon from '@mui/icons-material/StarRate';

type ShopListProps = {
  name: string; //식당명
  category: string;
  description: string;
  menuList: string[];
  starAverage: number;
};

const defaultProps: ShopListProps = {
  name: '식당이름1',
  category: '한식',
  description: '식당설명란입니다.',
  menuList: ['대표메뉴1', '대표메뉴2', '대표메뉴3'],
  starAverage: 4.5,
};

const MenuCard = ({ name, category, description, menuList, starAverage }: ShopListProps) => {
  return (
    <Container>
      <CardTitle>
        {name}
        <CardCategory>{category}</CardCategory>
      </CardTitle>
      <CardImage>
        <img
          width="330px"
          height="200px"
          src="https://png.pngtree.com/background/20211216/original/pngtree-dining-room-at-night-picture-image_1531627.jpg"
          alt="restaurant"
        />
      </CardImage>
      <CardDescription>{`" ${description} "`}</CardDescription>
      <MenuList>
        {menuList.map((menu, idx) => {
          return <Menu key={`${name}-${menu}-${idx}`}>{menu}</Menu>;
        })}
      </MenuList>
      <Line />
      <StarContainer>
        <StarRateIcon
          sx={{ bottom: '20px', right: '88px', position: 'absolute', color: '#f50c43' }}
        />
        <StarAvg>{starAverage.toFixed(1)}</StarAvg>
        <StarTotal>/5</StarTotal>
      </StarContainer>
    </Container>
  );
};

MenuCard.defaultProps = defaultProps;

export default MenuCard;

const Container = styled.div`
  background-color: ${props=>props.theme.colors.innerContainer};
  border-radius: 10px;
  width: 400px;
  height: 470px;
  box-sizing: border-box;
  padding-left: 28px;
  padding-right: 28px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h5`
  font-weight: bold;
  font-size: ${props=>props.theme.font.size.containerTitle};
  line-height: 26px;
  color: ${props=>props.theme.font.color.balck};
  margin-top: 25px;
  margin-bottom: 16px;
`;

const CardCategory = styled.span`
  font-weight: lighter;
  font-size: 12px;
  margin-left: 5px;
`;

const CardImage = styled.div``;

const CardDescription = styled.p`
  color: #5e5f61;
  font-size: ${props=>props.theme.font.size.normal};
  margin: 16px 0;
  line-height: 20px;
`;

const MenuList = styled.div``;
const Menu = styled.li`
  font-size: ${props=>props.theme.font.size.normal};
  line-height: 18px;
`;

const Line = styled.div`
  width: 400px;
  height: 1px;
  background-color: ${props=>props.theme.colors.lightGray};
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
  color: #727273;
  right: 44px;
`;
