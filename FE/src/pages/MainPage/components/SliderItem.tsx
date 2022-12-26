import { useContext, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { getHourmin } from '../../../util/getDate';
import { Party } from '../Type';
import { SocketContext } from '../../../socket/SocketContext';

const ItemContainer = styled.div``;

const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SliderItemProps {
  party: Party;
  index: number;
  slideIndex: number;
}

const SliderItem = ({ party, index, slideIndex }: SliderItemProps) => {
  const socket = useContext(SocketContext);
  const [hour, minute] = getHourmin(party.createdAt, party.timeLimit);

  const handleClick = () => {
    console.log('hi');
  };

  return (
    <ItemContainer
      className={index === slideIndex ? 'slide slide-center' : 'slide'}
      key={party.shopId}>
      <NavLink to={`/foodList/${party.shopId}`}>
        <img src={party.shopPicture} alt="shopImg" />
      </NavLink>
      <Description>
        <span style={{ fontSize: '15px' }}>{party.name}</span>
        <span style={{ fontSize: '15px' }}>
          모집 현황 : {party.likedNum}/{party.partylimit}
        </span>
        <span style={{ fontSize: '15px' }}>마감 시간 : {`${hour}시 ${minute}분`}</span>
        <span style={{ alignItems: 'center' }}>
          <span>
            <AiFillStar size="19" color="#faaf00" />
          </span>
          <span style={{ fontSize: '15px' }}>{Number(party.avgStar).toFixed(1)}</span>
        </span>
      </Description>
      <Button variant="contained" sx={{ cursor: 'pointer', zIndex: 100 }} onClick={handleClick}>
        참여하기
      </Button>
    </ItemContainer>
  );
};

export default SliderItem;
