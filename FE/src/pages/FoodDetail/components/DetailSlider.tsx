import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const SliderContainer = styled.div`
  width: 800px;
  height: 550px;
  position: relative;
  margin: 60px;
`;

const StyledSlider = styled(Slider)`
  height: 450px;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
  }
  .slick-slide div {
    cursor: pointer;
  }
  .slick-prev:hover {
    color: ${({ theme }) => theme.colors.main};
  }
  .slick-next:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;

const Div = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 99;
  font-size: 100px;
  color: ${({ theme }) => theme.font.color.black};
  right: -30px;
  top: 200px;
`;

const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 99;
  font-size: 100px;
  color: ${({ theme }) => theme.font.color.black};
  top: 200px;
  left: -100px;
`;

const Img = styled.img`
  width: inherit;
  height: inherit;
  max-width: 800px;
  max-height: 550px;
`;

const ImgContainer = styled.div`
  .images {
  }
`;

type stringNull = string | null;

interface DetailSliderProps {
  imageArr: stringNull[];
}

const DetailSlider = ({ imageArr }: DetailSliderProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: (
      <Div>
        <MdKeyboardArrowRight />
      </Div>
    ),
    prevArrow: (
      <DivPre>
        <MdKeyboardArrowLeft />
      </DivPre>
    ),
  };

  const newImageArr = imageArr.map((x) => {
    if (x === null) return undefined;
    return x;
  });

  return (
    <SliderContainer>
      <StyledSlider {...settings}>
        {newImageArr.map((imgUrl) => (
          <ImgContainer>
            <Img alt="shopImage" src={imgUrl} key={imgUrl} className="images" />
          </ImgContainer>
        ))}
      </StyledSlider>
    </SliderContainer>
  );
};

export default DetailSlider;
