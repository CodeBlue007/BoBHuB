import { Button } from '@mui/material';
import styled from 'styled-components';

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 100%;
  position: absolute;
  top: 205px;
  right: 200px;
  text-align: right;
  .main {
    margin: 20px 0px 30px 0px;
    font-size: 4em;
    font-weight: bold;
    color: white;
  }
  .sub {
    margin-bottom: 200px;
    font-size: 2em;
    font-weight: bold;
    color: white;
  }
`;

const Container = styled.div`
  :after {
    width: 100%;
    position: absolute;
    top: 63px;
    left: 5px;
    bottom: 0;
    left: 0;
    content: '';
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

const IntroSection = () => {
  return (
    <Container style={{ display: 'flex', flexDirection: 'row' }}>
      <video autoPlay={true} muted={true} style={{ width: '100%', height: 'auto' }} loop>
        <source src={'video/teamLunch.mp4'} type="video/mp4" />
      </video>
      <Intro>
        <div className="main" style={{ zIndex: 1 }}>
          혼자 밥 먹기 싫을 땐?
        </div>
        <div className="sub" style={{ zIndex: 1 }}>
          밥허브로 밥메이트 구해요~
        </div>
        <Button variant="contained" style={{ zIndex: 1}}>
          맛집 찾기
        </Button>
      </Intro>
    </Container>
  );
};

export default IntroSection;
