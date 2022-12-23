import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';


const SliderContainer = styled.div`
  width: 800px;
  height: 450px;
  position: relative;
  margin : 20px;
`;

const StyledSlider = styled(Slider)`
  height: 260px;
  width: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
  }
  .slick-slide div {
    cursor: pointer;
  }
  .slick-prev:hover{
    color : gold;
  }
  .slick-next:hover{
    color : gold;
  }
`;

const Div = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 99;
  text-align: right;
  font-size : 100px;
  color : black;
  right : 16px;
  line-height: 40px;
`;

const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 99;
  text-align: left;
  font-size : 100px;
  color : black;
  line-height: 40px;
  left : -55px;
`;



type stringNull = string|null

interface DetailSliderProps{
  imageArr : stringNull[];
}

const DetailSlider = ({imageArr} : DetailSliderProps) => {

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
        <MdKeyboardArrowRight/>
      </Div>
    ),
    prevArrow: (
      <DivPre>
        <MdKeyboardArrowLeft/>
      </DivPre>
    ),
  };

  const newImageArr = imageArr.map(x => {
    if(x===null) return undefined;
    return x;
  })


  return (
    <SliderContainer>
      <StyledSlider{...settings}>
        {newImageArr.map((imgUrl) => <img alt="shopImage" src={imgUrl} key={imgUrl}/>)}
      </StyledSlider>
    </SliderContainer>
  );
};

export default DetailSlider;
