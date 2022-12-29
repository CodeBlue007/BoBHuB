import styled from 'styled-components';
import { Card, Button } from '@mui/material';
import SelectTags from './SelectTags';
import { useState, useContext, useEffect } from 'react';
import { ShopState } from '../util/Type';
import { FlexContainer } from '../../../styles/GlobalStyle';
import React from 'react';
import { postParty } from '../foodDetailApi';
import { SocketContext } from '../../../socket/SocketContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const ContentContainer = styled(FlexContainer)`
  flex-direction: column;
  width: 60vw;
  justify-content: flex-start;
  margin-bottom: 70px;
`;

const MenuContainer = styled(FlexContainer)`
  width: inherit;
  margin-top: 40px;
  align-items: flex-start;
  justify-content: space-between;
  .description {
    font-size: 1.5rem;
  }
`;

const TitleContainer = styled(FlexContainer)`
  width: inherit;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 0.5px solid black;
  height: 15%;
`;

const Title = styled.div`
  font-size: 2.5rem;
  margin-left: 50px;
`;

type MenuCardProps = {
  width: string;
  size: string;
};

const MenuCard = styled(Card)<MenuCardProps>`
  width: ${(props) => props.width};
  font-size: ${(props) => props.size};
  padding: 20px;
  margin-left: 30px;
  font-size: 20px;
  flex: 2;
  p {
    margin-bottom: 20px;
  }
`;

const ATag = styled.a`
  text-decoration: none;
  color: #1e1f21;
  font-size: 1.2rem;
  position: relative;
  &:hover {
    color: ${({ theme }) => theme.colors.main};
  }
  &:before {
    content: ' ';
    position: absolute;
    background-color: black;
    height: 1px;
    width: 0;
    transition: 0.5s;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
  &:hover:before {
    width: 100%;
  }
`;

const SelectContainer = styled.div`
  height: inherit;
`;

const LikeButton = styled(Button)`
  width: 110px;
`;

interface Contentype {
  shop: ShopState;
}

const Content = ({ shop }: Contentype) => {
  const [partyLimit, setpartyLimit] = useState<number>(2);
  const BASEURL = 'https://map.naver.com/v5/entry/place/';
  const socket = useContext(SocketContext);
  const userId = useSelector((state: RootState) => state.userReducer.currentUser.userId);
  const activePartyList = useSelector(
    (state: RootState) => state.partySliceReducer.activePartyList,
  );
  const [isJoined, setIsJoined] = useState(false);

  const myPartyList = useSelector((state: RootState) => state.partySliceReducer.myPartyList);
  const [gathering, setGathering] = useState(false);
  const currentParty = activePartyList
    .filter((party) => party.likedNum !== party.partyLimit)
    .find((party) => party.shopId === shop.shopId);

  useEffect(() => {
    if (currentParty) {
      setGathering(true);
    } else {
      setGathering(false);
    }
  }, [activePartyList]);

  useEffect(() => {
    if (myPartyList.find((myParty) => myParty.shopId === shop.shopId)) {
      setIsJoined(true);
    } else {
      setIsJoined(false);
    }
  }, [myPartyList]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const party = {
      shopId: shop.shopId,
      partyLimit,
      timeLimit: 30,
    };
    const message = await postParty(party);
    if (message) {
      socket.emit('createParty', '생성요청');
      alert('식당모임이 생성되었습니다.');
    }
  };

  const clickJoinButton = (partyId: number) => {
    socket.emit('joinParty', partyId, userId);
  };

  return (
    <ContentContainer>
      <TitleContainer>
        <Title>
          {shop.name}({shop.category})
        </Title>
        {gathering || (
          <LikeButton
            variant="contained"
            onClick={handleClick}
            sx={{
              fontSize: '20px',
              marginRight: '30px',
            }}>{`모임 생성`}</LikeButton>
        )}
        {gathering && !isJoined && (
          <LikeButton
            variant="contained"
            onClick={() => clickJoinButton(currentParty?.partyId as number)}
            sx={{
              fontSize: '20px',
              marginRight: '30px',
            }}>{`모임 참여`}</LikeButton>
        )}
        {isJoined && <p>참여중</p>}
      </TitleContainer>

      <MenuContainer>
        <MenuCard size={'15px'} width={'20vw'}>
          <p className="description">{shop.description}</p>
          <p>{`거리 : 걸어서 ${shop.distance}분 거리`}</p>
          <ATag href={`${BASEURL}${shop.address}`} target="_blank" rel="noreferrer">
            지도 보기
          </ATag>
        </MenuCard>
        <SelectContainer>
          <SelectTags type={'모집인원'} value={partyLimit} setValue={setpartyLimit} />
        </SelectContainer>
      </MenuContainer>
    </ContentContainer>
  );
};

export default React.memo(Content);
