import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { fetchParties } from '../api/fetchParties';
import { NavLink } from 'react-router-dom';
import { SocketContext } from '../../../socket/SocketContext';
import zIndex from '@mui/material/styles/zIndex';

export interface Party {
  shopId: number;
  name: string;
  shopPicture: string;
  address: string;
  avgStar: number;
}

const StyledSlider = styled(Slider)`
  border: 1px solid black;
  height: 45vh;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 45vh;
  border: 1px solid black;
  box-sizing: border-box;
`;

const Div = styled.div`
  height: 100%;
  background-color: #fffaf5;
  box-sizing: border-box;
  width: 100%;
  place-items: center;

  .slick-prev:before,
  .slick-next:before {
    font-family: 'slick';
    font-size: 40px;
    line-height: 1;
    opacity: 0.75;
    color: #000000;
    -webkit-font-smoothing: antialiased;
    position: absolute;
    top: -235px;
  }

  .slick-prev:before {
    position: absolute;
    left: 100px;
  }
  .slick-next:before {
    position: absolute;
    right: 100px;
  } // arrow
  .slick-slider {
    padding: 0 15px;
  } //slider

  .slick-list {
    margin-right: -15px;
    margin-left: -15px;
    pointer-events: none;
  } //parent

  .slick-slide {
    background-color: white;
    border-radius: 15px;
    height: 350px;
    text-align: center;
    z-index: 1;
    border: 1px  solid black;
  } //item

  .slide {
    opacity: 0.5;
    transform: scale(0.7);
    transition: 0.3s;
    filter: blur (5px);
  }
  .slide-center {
    opacity: 1;
    transform: scale(1);
  }

  // .arrow {
  //   font-size: 3em;
  //   padding: 5px 15px;
  //   border-radius: 10px;
  //   width: 10px;
  //   position: absolute;
  //   top: 50px;
  //   background-color: transparent;
  //   color: white;
  // }

  // .arrow-right {
  //   right: 30px;
  // }

  // .arrow-left {
  //   left: -15px;
  //   z-index: 999;
  // }

  img {
    margin: auto auto 10px auto;
    max-height: 200px;
    overflow: hidden;
    width: 100%;
  }

  span {
    /* position: absolute; */
    top: 150px;
    color: black;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const TitleBox = styled.div`
  height: 30px;
  font-size: 2em;
  margin: 30px 30px 30px 30px;
  color: #424140;
  font-weight: bold;
  text-align: center;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 20px;
  }
`;

const ItemContainer = styled.div`
  z-index: 100;
`

// export function NextArrow() {
//   return (
//     <div className="arrow arrow-right">
//       <MdKeyboardArrowRight />
//     </div>
//   );
// }

// export function PrevArrow() {
//   return (
//     <div className="arrow arrow-left">
//       <MdKeyboardArrowLeft />
//     </div>
//   );
// }

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
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
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
  const socket = useContext(SocketContext);

  const setPartiesData = async () => {
    const data: Party[] = await fetchParties();
    console.log(data);
    setParties([...data]);
  };

  useEffect(() => {
    setPartiesData();
  }, []);

  return (
    <Div>
      <TitleBox>오늘 뭐 먹지?</TitleBox>
      <div>
        {parties.length === 0 ? (
          <LabelContainer>
            <div>활성화된 식당이 없습니다.</div>
          </LabelContainer>
        ) : (
          <StyledSlider {...settings}>
            {parties.map((party: Party, index: number) => (
              <NavLink to={`/foodDetail/${party.shopId}`}>
                <ItemContainer
                  className={index === slideIndex ? 'slide slide-center' : 'slide'}
                  key={`${party.shopId}`}>
                  <img src={party.shopPicture} alt="img" />
                  <Description>
                    <span>{party.name}</span>
                    <span>{party.avgStar}</span>
                    <span>{party.address}</span>
                  </Description>
                  <Button variant="contained" sx={{ cursor: "pointer", zIndex:100}} >
                    찜하기
                  </Button>
                </ItemContainer>
              </NavLink>
            ))}
          </StyledSlider>
        )}
      </div>
    </Div>
  );
}
