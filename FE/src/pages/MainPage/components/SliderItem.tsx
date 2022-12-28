import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { getHourmin } from '../../../util/getDate';
import { Party } from '../Type';
import { SocketContext } from '../../../socket/SocketContext';
import HeartButton from './HeartIcon';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getLimitTime } from './../../../util/getLimitTime';

const ItemContainer = styled.div`
  background-color: white;
  padding: 30px;
  margin: 10px 20px 10px 20px;
  border-radius: 10px;
  height: 400px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid grey;
  height: 100px;
  padding-top: 18px;
  .name {
    font-size: 30px;
    margin-right: 30px;
  }
  .avgStar {
    font-size: 27px;
    margin-left: 5px;
  }
  .party_info {
    padding-top: 7px;
    align-self: center;
    text-align: left;
    font-size: 12px;
    display: flex;
    flex-direction: row;
  }
  .likedNum {
    color: #2485ed;
    font-size: 17px;
    margin: 10px 20px 5px 0;
  }
  .time {
    color: #ed4c24;
    font-size: 17px;
  }
`;

interface SliderItemProps {
  party: Party;
  index: number;
  slideIndex: number;
  setPartiesData: () => void;
}

const SliderItem = ({ party, index, slideIndex, setPartiesData }: SliderItemProps) => {
  const socket = useContext(SocketContext);
  const [hour, minute] = getHourmin(party.createdAt, party.timeLimit);
  const [like, setLike] = useState(false);
  const userId = useSelector<RootState>((state) => state.userReducer.currentUser.userId);

  const handleLike = (partyId: number) => {
    setLike(!like);
    console.log('partyId :', partyId);
    console.log('userId :', userId);
    socket.emit('joinParty', partyId, userId);
  };

  const limit = getLimitTime(party.createdAt, party.timeLimit);

  return (
    <ItemContainer
      className={index === slideIndex ? 'slide slide-center' : 'slide'}
      key={party.shopId}>
      <NavLink to={`/foodList/${party.shopId}`}>
        <img src={party.shopPicture} alt="shopImg" />
      </NavLink>
      <Description>
        <div>
          <span className="name">{party.name}</span>
          <StarRateIcon sx={{ color: '#faaf00' }} />
          <span className="avgStar">{Number(party.avgStar).toFixed(1)} / 5</span>
        </div>
        <div className="party_info">
          <span>
            <div className="likedNum">
              모집 현황 : {party.likedNum} 명 / 총 {party.partylimit} 명
            </div>
            <div className="time">모집 종료 시간: {limit}</div>
          </span>
          <span style={{ margin: '0 0 0 50px' }}>
            <HeartButton like={like} onClick={() => handleLike(party.partyId)} />
          </span>
        </div>
      </Description>
    </ItemContainer>
  );
};

export default SliderItem;
