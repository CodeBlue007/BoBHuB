import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { data } from './data';

const StyledSlider = styled(Slider)`
  height: 300px;
`;

const Div = styled.div`
  width: 95%;
  height: 500px;
  background-color: rgba(132, 168, 0);
  border-radius: 20px;
  position: absolute;
  top: 800px;
  left: 10px;
  right: 10px;
  margin: 20px;
  place-items: center;
  .slick-prev:before {
    opaicty: 1;
    color: black;
    left: 0;
  }
  .slick-next:before {
    opacity: 1;
    color: black;
  }
  .slick-slide {
    padding: 10px;
    background-color: white;
    margin-right: 15px;
    border-radius: 15px;
    height: 350px;
    text-align: center;
  }
  .slide {
    opacity: 0.5;
    transform: scale(0.7);
    transition: 0.3s;
    filter: blur (5px);
  }
  .slide-active {
    opacity: 1;
    transform: scale(1);
  }

  .arrow {
    font-size: 12px;
    padding: 5px 15px;
    border-radius: 10px;
    box-shadow: 0 0 5px 3px #ccc;
    width: 10px;
    position: absolute;
    top: 200px;
    background-color: grey;
  }

  .arrow-right {
    right: 15px;
  }

  .arrow-left {
    left: 15px;
    z-index: 10;
  }

  img {
    margin: auto auto 50px auto;
    max-height: 200px;
    overflow: hidden;
    width: 100%;
    z-index: -1;
  }

  span {
    position: absolute;
    top: 150px;
    color: white;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const TitleBox = styled.div`
  height: 30px;
  font-size: 2em;
  margin: 30px 30px 30px 30px;
  color: white;
  font-weight: bold;
`;

function NextArrow({ onClick }: any) {
  return (
    <div className="arrow arrow-right" onClick={onClick}>
      <AiOutlineArrowRight />
    </div>
  );
}

function PrevArrow({ onClick }: any) {
  return (
    <div className="arrow arrow-left" onClick={onClick}>
      <AiOutlineArrowLeft />
    </div>
  );
}

export default function SimpleSlider() {
  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    draggable: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current: any, next: any) => setSlideIndex(next),
    centerMode: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Div>
      <TitleBox>오늘 뭐 먹지?</TitleBox>
      <div>
        <StyledSlider {...settings}>
          {data.map((menu, index) => (
            <div className={index === slideIndex ? 'slide slide-active' : 'slide'}>
              <img src={menu.img} alt="img" />
              <span>{menu.restaurant}</span>
              <Button variant="contained">찜하기</Button>
            </div>
          ))}
        </StyledSlider>
      </div>
    </Div>
  );
}
