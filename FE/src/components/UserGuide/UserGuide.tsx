import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import chat from './assets/chat.png';
import dinner from './assets/dinner.png';
import searchEngine from './assets/searchEngine.png';
import slide from './assets/slide.png';
import touch from './assets/touch.png';
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
    color : black;
  }
  .slick-next:hover{
    color : black;
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
    font-size: 1.3em;
    font-weight: bold;
  }

  img {
    margin: none;
    width: 300px;
    margin: 0 0 100px 100px;
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
  color: black;
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
  color: black;
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
            <img src={slide} alt="slide" />
            <span>메인페이지 슬라이더로 원하는 맛집이 있는지 확인해보세요!</span>
          </div>
          <div>
            <img src={touch} alt="touch" />
            <span>슬라이더에 원하는 맛집이 있다면 하트를 눌러요!</span>
          </div>
          <div>
            <img src={searchEngine} alt="searchEngine" />
            <span>원하는 맛집이 없다면 맛집 찾기 버튼을 눌러 검색해보세요!</span>
          </div>
          <div>
            <img src={chat} alt="Chat" />
            <span>인원이 다 차면 채팅방이 생성돼요!</span>
          </div>
          <div>
            <img src={dinner} alt="dinner" />
            <span>밥메이트들과 맛있는 식사하세요!</span>
          </div>
        </StyledSlider>
      </Div>
    </div>
  );
};

export default UserGuide;
