import { useContext, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { getHourmin } from '../../../util/getDate';
import { Party } from '../Type';
import { SocketContext } from '../../../socket/SocketContext';
import HeartButton from './HeartIcon';

const ItemContainer = styled.div`
  background-color: #e59a59;
  padding: 30px;
  margin: 8px 20px 10px 20px;
  border-radius: 10px;
  height: 400px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  height: 100px;
  .name {
    font-size: 25px;
  }
  .avgStar {
    font-size: 18px;
  }
  .party_info {
    align-self: center;
    text-align: left;
    font-size: 12px;
    display: flex;
    flex-direction: row;
  }
  .likedNum {
    color: blue;
    font-size: 17px;
    margin: 10px 20px 5px 0;
  }
  .time {
    color: red;
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
  const [hour, minute] = getHourmin(party.createdAt, party.timeLimit);
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

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
        <div>
          <span className="name">{party.name}</span>
          <span style={{ marginLeft: '3px' }}>
            <AiFillStar size="19" color="#faaf00" />
          </span>
          <span className="avgStar" style={{ marginTop: '3px' }}>
            {Number(party.avgStar).toFixed(1)}
          </span>
        </div>
        <div className="party_info">
          <span>
            <div className="likedNum">
              모집 현황 : {party.likedNum} 명/총 {party.partylimit} 명
            </div>
            <div className="time">모집 종료 시간: {`${hour}시 ${minute}분`}</div>
          </span>
          <span style={{ margin: '3px 0 0 30px' }}>
            <HeartButton like={like} onClick={handleLike} />
          </span>
        </div>
      </Description>
    </ItemContainer>
  );
};

export default SliderItem;
