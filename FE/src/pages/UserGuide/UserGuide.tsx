import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import heart from './assets/Heart.gif';
import hamburger from './assets/Hamburger.gif';
import chat from './assets/Chat.gif';

const StyledSlider = styled(Slider)`
  height: 64vh;
`;

const Div = styled.div`
  margin-top: 100px;
  height: 100%;
  min-width: 1000px;
  place-items: center;

  .slick-slider {
    overflow: hidden;
    padding: 0 15px;
  }

  .slick-list {
    width: 500px;
    height: 500px;
    margin: 0 auto;
    justify-content: center;
  }

  .slick-prev:before,
  .slick-next:before {
    font-family: 'slick';
    font-size: 40px;
    line-height: 1;
    opacity: 0.75;
    color: #000000;
    -webkit-font-smoothing: antialiased;
  }

  .slick-prev:before {
    position: absolute;
    left: 400px;
    top: -20px;
  }

  .slick-next:before {
    position: absolute;
    right: 400px;
    top: -20px;
  }

  .slick-slide {
    border-radius: 15px;
    height: 350px;
    text-align: center;
  }

  img {
    margin-left: 50px;
  }

  span {
    font-size: 1.5em;
    font-weight: bold;
  }
`;

const UserGuide = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
  };

  return (
    <div>
      <NavBar />
      <Div>
        <StyledSlider {...settings}>
          <div>
            <img src={heart} alt="Heart" style={{ height: '400px' }} />
            <span>원하는 식당에 찜하기 버튼을 누르세요!</span>
          </div>
          <div>
            <img src={chat} alt="Chat" style={{ height: '400px' }} />
            <span>채팅방이 생성되면 밥메이트들과 약속을 정해봐요!</span>
          </div>
          <div>
            <img src={hamburger} alt="Hamburger" style={{ height: '400px' }} />
            <span>밥메이트들과 맛있는 식사하세요~</span>
          </div>
        </StyledSlider>
      </Div>
      <Footer />
    </div>
  );
};

export default UserGuide;
