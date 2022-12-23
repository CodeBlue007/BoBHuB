import { Button } from '@mui/material';
import styled from 'styled-components';

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 600px;
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
  position: relative;
  box-sizing: border-box;
  width: 100%;
  &:after {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
  }
`;

const IntroSection = () => {
  return (
    <Container>
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
        <Button variant="contained" style={{ zIndex: 1 }} sx={{ backgroundColor: '#E59A59' }}>
          맛집 찾기
        </Button>
      </Intro>
    </Container>
  );
};

export default IntroSection;
