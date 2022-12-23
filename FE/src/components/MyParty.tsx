import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

interface MyPartyProps {
  open: boolean;
  handleClose: () => void;
}

const MyParty = ({ open, handleClose }: MyPartyProps) => {
  return (
    <Container>
      <Div>
        <Flex>
          <h4>찜 목록</h4>
          <Button onClick={handleClose}>
            <Close />
          </Button>
        </Flex>
      </Div>
      <Div>
        <div>
          <p>식당이름</p>
        </div>
        <div>남은시간 30:00</div>
        <div>참여한 인원 1/4</div>
      </Div>
    </Container>
  );
};

export default MyParty;

const Container = styled.div`
  color: black;
  font-size: 14px;
  width: 450px;
  height: 600px;
  background-color: white;
  position: absolute;
  top: 100%;
  right: 100px;
  border-radius: 4px;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
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
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
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
