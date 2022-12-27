import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import heart from './assets/Heart.gif';
import hamburger from './assets/Hamburger.gif';
import chat from './assets/Chat.gif';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const StyledSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
  }
  .slick-slide div {
    cursor: pointer;
  }
  .slick-prev:hover{
    color : ${({ theme }) => theme.colors.main};
  }
  .slick-next:hover{
    color : ${({ theme }) => theme.colors.main};
`;

const Div = styled.div`
  margin-top: 100px;
  height: 100%;
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

  span {
    font-size: 1.5em;
    font-weight: bold;
  }

  img {
    margin: none;
    width: 400px;
    margin-left: 50px;
  }
`;

const DivNext = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 100px;
  right: 100px;
  z-index: 99;
  text-align: right;
  font-size: 100px;
  color: ${({ theme }) => theme.colors.emphasis};
  line-height: 40px;
`;

const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 100px;
  left: 40px;
  z-index: 99;
  text-align: left;
  font-size: 100px;
  color: ${({ theme }) => theme.colors.emphasis};
  line-height: 40px;
`;

const UserGuide = () => {
  const settings = {
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
      <Div>
        <StyledSlider {...settings}>
          <div>
            <img src={heart} alt="Heart" />
            <span>원하는 식당에 찜하기 버튼을 누르세요!</span>
          </div>
          <div>
            <img src={chat} alt="Chat" />
            <span>채팅방이 생성되면 밥메이트들과 약속을 정해봐요!</span>
          </div>
          <div>
            <img src={hamburger} alt="Hamburger" />
            <span>밥메이트들과 맛있는 식사하세요~</span>
          </div>
        </StyledSlider>
      </Div>
    </div>
  );
};

export default UserGuide;
