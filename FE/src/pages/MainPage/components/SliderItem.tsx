import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Party } from '../Type';
import { SocketContext } from '../../../socket/SocketContext';
import HeartButton from './HeartIcon';
import StarRateIcon from '@mui/icons-material/StarRate';
import LockIcon from '@mui/icons-material/Lock';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

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
    margin: 15px 20px 5px 0;
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
}

const SliderItem = ({ party, index, slideIndex }: SliderItemProps) => {
  const socket = useContext(SocketContext);
  const [like, setLike] = useState(false);
  const userId = useSelector<RootState>((state) => state.userReducer.currentUser.userId);
  const [isJoined, setIsJoined] = useState(false);
  const myPartyList = useSelector((state: RootState) => state.partySliceReducer.myPartyList);

  useEffect(() => {
    if (myPartyList.find((myParty) => myParty.shopId === party.shopId)) {
      setIsJoined(true);
    } else {
      setIsJoined(false);
      setLike(false);
    }
  }, [myPartyList]);

  const handleLike = (partyId: number) => {
    setLike(!like);
    socket.emit('joinParty', partyId, userId);
  };

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
              모집 현황 : {party.likedNum} 명 / 총 {party.partyLimit} 명
            </div>
          </span>
          <span style={{ margin: '0 0 0 50px' }}>
            {isJoined ? (
              <div>
                <LockIcon />
                <p>참여중</p>
              </div>
            ) : (
              <HeartButton like={like} onClick={() => handleLike(party.partyId)} />
            )}
          </span>
        </div>
      </Description>
    </ItemContainer>
  );
};

export default SliderItem;
