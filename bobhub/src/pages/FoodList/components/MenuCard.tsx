import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';

type ListProps = {
    title: string;
    category: string;
    description: string;
    menuList: string[];
}


const defaultProps = {
    title: '식당이름1',
    category: '한식',
    description: '식당설명란입니다.',
    menuList: ['대표메뉴1', '대표메뉴2', '대표메뉴3'],
}

const MenuCard = ({ title, category, description, menuList }: ListProps & typeof defaultProps) => {

    return (
        <Container>
            <CardTitle>
                {title}
                <CardCategory>{category}</CardCategory>
            </CardTitle>
            <CardImage>
                <img width='330px' height='200px' src='https://png.pngtree.com/background/20211216/original/pngtree-dining-room-at-night-picture-image_1531627.jpg' alt='restaurant' />
            </CardImage>
            <CardDescription>
                {description}
            </CardDescription>
            <MenuList>
                {menuList.map((menu, idx) => {
                    return <Menu key={`${title}-${menu}-${idx}`}>{menu}</Menu>
                })}
            </MenuList>
            <Line />
            <FavoriteIcon sx={{ bottom: '20px', right: '15px', position: 'absolute', color: '#f50c43' }} />
        </Container>
    )
}

MenuCard.defaultProps = defaultProps;
export default MenuCard;

const Container = styled.div`
    background-color:#f7f7f7;
    border: 0px solid #8952bf;
    border-radius: 8px;
    width: 400px;
    height: 470px;
    box-sizing: border-box;
    padding-left:28px;
    padding-right:28px;
    position: relative;
    display: flex;
    flex-direction: column;
`

const CardTitle = styled.h5`
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    color: #151618;
    margin-top: 25px;
    margin-bottom: 16px;
`;

const CardCategory = styled.span`
    font-weight: lighter;
    font-size:12px;
    margin-left:5px;
`

const CardImage = styled.div`
`

const CardDescription = styled.p`
    color: #5e5f61;
    font-size: 14px;
    margin: 16px 0;
    line-height:20px;
`;

const MenuList = styled.div`
`
const Menu = styled.li`
    font-size:14px;
    line-height:18px;
`

const Line=styled.div`
    width:400px;
    height:1px;
    background-color:#dfdce0;
    position:absolute;
    left:0;
    bottom:60px;
`