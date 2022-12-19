import NavBar from '../../components/NavBar';
import MainPageFooter from '../MainPage/components/MainPageFooter';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledSlider = styled(Slider)`
  height: 100%;
`;

const Div = styled.div`
  height: 500px;
  position: absolute;
  top: 180px;
  width: 100vw;
  place-items: center;

  .slick-slider {
    overflow: hidden;
    padding: 0 15px;
  }

  .slick-list {
    width: 500px;
    height: 500px;
    margin: 0 auto;
    background-color: #f0f9ff;
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
  }

  .slick-next:before {
    position: absolute;
    right: 400px;
  }

  .slick-slide {
    /* background-color: white; */
    border-radius: 15px;
    height: 350px;
    text-align: center;
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
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </StyledSlider>
      </Div>
      <MainPageFooter />
    </div>
  );
};

export default UserGuide;
