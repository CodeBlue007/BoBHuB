import styled from 'styled-components';
import { Paper, Card, Button } from '@mui/material';
import SelectTags from './SelectTags';
import { useEffect, useState } from 'react';
import { shopStateType } from '../types/Type';
import { FlexContainer } from '../../../styles/GlobalStyle';


const ContentContainer = styled(FlexContainer)`
  flex-direction: column;
  height: 80vh;
`;

const MenuContainer = styled(FlexContainer)`
  width: 25vw;
`;

const ShopTitle = styled.div`
  font-size: 25px;
  padding: 20px;
`;

const MenuCard = styled(Card)`
  width: 20vw;
  padding: 10px;
`;

const SelectContainer = styled.div`
  height: inherit;
`;

const LikeButton = styled(Button)`
  width: 15vw;
`;

interface Contentype{
    shop : shopStateType;
}


const Content = ({shop} : Contentype) => {
  const [isClicked, setClicked] = useState<boolean>(false);
  const [people, setPeople] = useState<number>(2);
  const [duration, setDuration] = useState<number>(15);
  const [likeAll, setlikeAll] = useState<number>(0);

  useEffect(()=> {
    setlikeAll(shop.like);
  },[]);


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isClicked) {
      alert('이미 찜한 식당입니다.');
      return;
    }
    setClicked(true);
    setlikeAll((current) => current + 1);
  };

  return (
    <ContentContainer>
      <Paper>
        <ShopTitle>{shop.name}</ShopTitle>
      </Paper>
      <MenuCard>
        <p>{shop.description}</p>
      </MenuCard>
      <MenuContainer>
        <MenuCard>
          <p>메뉴({shop.category})</p>
          <p>{shop.menu}</p>
        </MenuCard>
        <SelectContainer>
          <SelectTags type={'People'} value={people} setValue={setPeople} />
          <SelectTags type={'Duration'} value={duration} setValue={setDuration} />
        </SelectContainer>
      </MenuContainer>
      <LikeButton variant="contained" onClick={handleClick}>{`찜하기 ❤ : ${likeAll}`}</LikeButton>
    </ContentContainer>
  );
};

export default Content;
