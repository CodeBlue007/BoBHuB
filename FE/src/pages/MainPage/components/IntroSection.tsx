import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
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
    font-size: 5em;
    font-weight: bold;
    color: white;
    letter-spacing: 3px;
  }
  .sub {
    margin-bottom: 100px;
    font-size: 3em;
    font-weight: bold;
    color: white;
    letter-spacing: 3px;
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
  .navLink {
    text-decoration: none;
    position: absolute;
    right: 2vw;
    top: 230px;
  }
  .scroll {
    -webkit-animation: bounce 0.8s infinite linear;
    position: absolute;
    right: 50%;
    display: flex;
    flex-direction: column;
    color: hsla(0, 0%, 100%, 0.733);
    text-align: center;
    img {
      width: 3vw;
    }
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
        <NavLink to="/foodList" className="navLink">
          <Button
            style={{ zIndex: 1 }}
            sx={{
              width: '350px',
              border: '5px solid white',
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: '1.5em',
            }}>
            맛집 찾으러 가기 →
          </Button>
        </NavLink>
      </Intro>
      <div className="scroll">
        <img
          src="data:image/png;base64,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"
          alt="underScroll"
        />
        <p>scroll</p>
      </div>
    </Container>
  );
};

export default IntroSection;
