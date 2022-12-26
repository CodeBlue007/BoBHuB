import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import type { Party } from './NavBar';
import type { FoodType } from '../pages/Admin/components/Restraunt/Foods';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { delete as del } from '../api/API';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { UserType } from '../pages/Admin/components/User/components/Users';

interface MyPartyProps {
  open: boolean;
  handleClose: () => void;
  myPartyList: Party[];
  activeShopList: FoodType[];
  fetchPartyList: () => void;
}

const MyParty = ({
  open,
  handleClose,
  myPartyList,
  activeShopList,
  fetchPartyList,
}: MyPartyProps) => {
  const user = useSelector((state: RootState) => state.userReducer.currentUser);

  const clickDeleteButton = async (id: number) => {
    const res = await del(`/api/parties/${id}`);
    console.log(res);
    fetchPartyList();
  };

  return (
    <Container open={open}>
      <Div>
        <Bar>
          <H3>찜 목록</H3>
          <CloseButton onClick={handleClose}>
            <Close />
          </CloseButton>
        </Bar>
      </Div>
      <ListWrapper>
        {myPartyList.length === 0 && <List>참여중인 모임이 없습니다.</List>}
        {myPartyList.map((party, index) => {
          // UTC 기준 시간 > 한국시간으로 변경
          const date = new Date(party.createdAt);
          const offset = new Date(party.createdAt).getTimezoneOffset() * 60000;
          const dateOffset = new Date(date.getTime() - offset);
          const limit = new Date(
            dateOffset.setMinutes(dateOffset.getMinutes() + party.timeLimit),
          ).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
          return (
            <List key={party.partyId}>
              <BasicLink to={`/foodlist/${party.shopId}`}>
                <ImgWrapper>
                  <Img src={activeShopList[index].shopPicture} alt="img" />
                </ImgWrapper>
              </BasicLink>
              <Description>
                <BasicLink to={`/foodlist/${party.shopId}`}>
                  <Name>{activeShopList[index].name}</Name>
                </BasicLink>
                <Time>모집 종료 시간: {limit}</Time>
                <Paragraph>
                  참여한 인원 {party.likedNum}/{party.partylimit}
                </Paragraph>
              </Description>
              {user.userId === party.userId ? (
                <DeleteButton
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => clickDeleteButton(party.partyId)}>
                  모집 종료
                </DeleteButton>
              ) : (
                <DeleteButton>참여 취소</DeleteButton>
              )}
            </List>
          );
        })}
      </ListWrapper>
    </Container>
  );
};

export default MyParty;

const Container = styled.div<{ open: boolean }>`
  color: black;
  font-size: 14px;
  width: 400px;
  background-color: white;
  position: absolute;
  top: 100%;
  right: 100px;
  border-radius: 10px;
  z-index: 999;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  max-height: ${({ open }) => (open ? '500px' : 0)};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: all 0.3s ease-in-out;
  overflow: hidden;
`;

const Div = styled.div`
  padding: 5px 0 5px 0;
  width: 100%;
  border-bottom: 1px solid lightgray;
`;

const Flex = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 5px 10px 5px 10px;
  align-items: center;
`;

const Bar = styled(Flex)`
  justify-content: space-between;
`;

const CloseButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const Close = styled(CloseIcon)`
  color: lightgray;
  &:hover {
    color: black;
  }
`;

const DeleteButton = styled(Button)`
  position: relative;
  right: 0;
`;

const ListWrapper = styled(Div)`
  max-height: 400px;
  overflow-y: auto;
`;

const List = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
`;
const ImgWrapper = styled.div`
  width: 70px;
  height: 70px;
  padding: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const Description = styled.div`
  /* margin-left: 10px; */
`;

const Paragraph = styled.p`
  + p {
    margin-top: 10px;
  }
`;

const Name = styled(Paragraph)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Time = styled(Paragraph)`
  color: red;
  font-size: 10px;
`;

const H3 = styled.h3`
  font-size: 28px;
  font-weight: bolder;
`;

const BasicLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
