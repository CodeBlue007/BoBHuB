import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import heart from './assets/Heart.gif';
import hamburger from './assets/Hamburger.gif';
import chat from './assets/Chat.gif';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const StyledSlider = styled(Slider)`
  height: 73vh;

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
  }
  .slick-slide div {
    cursor: pointer;
  }
  .slick-prev:hover{
    color : #E59A59;
  }
  .slick-next:hover{
    color : #E59A59;
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

const DivNext = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 99;
  text-align: right;
  font-size: 100px;
  color: #712e1e;
  right: 100px;
  top: 120px;
  line-height: 40px;
`;

const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 120px;
  left: 40px;
  z-index: 99;
  text-align: left;
  font-size: 100px;
  color: #712e1e;
  line-height: 40px;
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
    nextArrow: (
      <DivNext>
        <MdKeyboardArrowRight />
      </DivNext>
    ),
    prevArrow: (
      <DivPre>
        <MdKeyboardArrowLeft />
      </DivPre>
    ),
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
