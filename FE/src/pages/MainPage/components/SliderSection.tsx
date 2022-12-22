import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { fetchParties } from '../api/fetchParties';

export interface Party {
  shopId: number;
  shopName: string;
  shopImage: string;
}

const StyledSlider = styled(Slider)`
  height: 100%;
`;

const Div = styled.div`
  height: 500px;
  background-color: rgba(132, 168, 0);
  position: absolute;
  top: 800px;
  width: 100vw;
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

  .slick-slider {
    overflow: hidden;
    padding: 0 15px;
  } //slider

  .slick-list {
    margin-right: -15px;
    margin-left: -15px;
    pointer-events: none;
  } //parent

  .slick-slide {
    /* background-color: white; */
    border-radius: 15px;
    height: 350px;
    text-align: center;
  } //item

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
    font-size: 3em;
    padding: 5px 15px;
    border-radius: 10px;
    width: 10px;
    position: absolute;
    top: 180px;
    background-color: transparent;
    color: white;
  }

  .arrow-right {
    right: 30px;
  }

  .arrow-left {
    left: -15px;
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

export function NextArrow() {
  return (
    <div className="arrow arrow-right">
      <MdKeyboardArrowRight />
    </div>
  );
}

export function PrevArrow() {
  return (
    <div className="arrow arrow-left">
      <MdKeyboardArrowLeft />
    </div>
  );
}

export default function SimpleSlider() {
  const settings = {
    dots: false,
    className: 'center',
    centerPadding: '0px',
    centerMode: true,
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
    beforeChange: (current: number, next: number) => setSlideIndex(next),
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

  const [parties, setParties] = useState<Party[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const setPartiesData = async () => {
    const data: Party[] = await fetchParties();
    setParties([...data]);
  };

  useEffect(() => {
    setPartiesData();
  }, []);

  return (
    <Div>
      <TitleBox>오늘 뭐 먹지?</TitleBox>
      <div>
        <StyledSlider {...settings}>
          {parties.length === 0 && <div>활성화된 식당이 없습니다.</div>}
          {parties.map((party: Party, index: number) => (
            <div
              className={index === slideIndex ? 'slide slide-active' : 'slide'}
              key={`${party.shopId}`}>
              <img src={party.shopImage} alt="img" />
              <span>{party.shopName}</span>
              <Button variant="contained">찜하기</Button>
            </div>
          ))}
        </StyledSlider>
      </div>
    </Div>
  );
}
