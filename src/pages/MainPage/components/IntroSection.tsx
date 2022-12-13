import { Button } from '@mui/material';
import styled from 'styled-components';

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
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
  .image {
    object-fit: cover;
    position: absolute;
    left: 500px;
    transform: rotate(90deg);
  }
`;

const IntroSection = () => {
  return (
    <Intro>
      <div className="main">혼자 밥 먹기 싫을 땐?</div>
      <div className="sub">밥허브로 밥메이트 구해요~</div>
      <Button variant="contained">맛집 찾기</Button>
      <div className="image">
        <img
          src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="식사 이미지"
        />
      </div>
    </Intro>
  );
};

export default IntroSection;
