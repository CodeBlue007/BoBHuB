import { Button } from '@mui/material';
import styled from 'styled-components';

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 100%;
  position: absolute;
  top: 205px;
  left: 200px;
  .main {
    margin: 20px 0px 30px 0px;
    font-size: 3em;
  }
  .sub {
    margin-bottom: 200px;
    font-size: 1.5em;
  }
`;

const Image = styled.img`
  transform: rotate(90deg);
  z-index: -1;
  position: absolute;
  left: 50%;
  top: 20%;
`;

const IntroSection = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Intro>
        <div className="main">혼자 밥 먹기 싫을 땐?</div>
        <div className="sub">밥허브로 밥메이트 구해요~</div>
        <Button variant="contained">맛집 찾기</Button>
      </Intro>
      <Image
        src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt="점심"
      />
    </div>
  );
};

export default IntroSection;
