import styled from 'styled-components';
import { Card, Button } from '@mui/material';
import SelectTags from './SelectTags';
import { useState } from 'react';
import { shopStateType } from '../types/Type';
import { FlexContainer } from '../../../styles/GlobalStyle';
import React from 'react';


const ContentContainer = styled(FlexContainer)`
  flex-direction: column;
  height: 80vh;
`;

const MenuContainer = styled(FlexContainer)`
  width: 25vw;
`;

type menuCardProps = {
    width : string,
    size : string,
}

const MenuCard = styled(Card)<menuCardProps>`
  width: ${(props) => props.width};
  font-size : ${(props) => props.size};
  padding: 20px;
`;

const SelectContainer = styled.div`
  height: inherit;
`;

const LikeButton = styled(Button)`
  width: 15vw;
  background-color:#E59A59;
`;

interface Contentype{
    shop : shopStateType;
}


const Content = ({shop} : Contentype) => {
  const [isClicked, setClicked] = useState<boolean>(false);
  const [people, setPeople] = useState<number>(2);
  const [duration, setDuration] = useState<number>(15);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isClicked) {
      alert('이미 찜한 식당입니다.');
      return;
    }
    setClicked(true);
    alert("찜하기를 완료했습니다.")
  };

  return (
    <ContentContainer>
      <MenuCard size={"25px"} width={"15vw"} style={{textAlign:`center`}}><p>{shop.name}</p></MenuCard>
      <MenuCard size={"15px"} width={"20vw"}>
        <p>{shop.description}</p>
      </MenuCard>
      <MenuContainer>
        <MenuCard size={"15px"} width={"20vw"}>
          <p>메뉴({shop.category})</p>
          <p>{shop.menu}</p>
        </MenuCard>
        <SelectContainer>
          <SelectTags type={'People'} value={people} setValue={setPeople} />
          <SelectTags type={'Duration'} value={duration} setValue={setDuration} />
        </SelectContainer>
      </MenuContainer>
      <LikeButton variant="contained" onClick={handleClick}>{`찜하기 ❤`}</LikeButton>
    </ContentContainer>
  );
};

export default React.memo(Content);
