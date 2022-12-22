import Slider from 'react-slick';
import styled from 'styled-components';

const SliderContainer = styled.div`
  border: 1px solid black;
  width: 800px;
`;

const DetailSlider = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <SliderContainer>
      <h2>Fade</h2>
      <Slider {...settings}>
        <div>"1"</div>
        <div>"2"</div>
        <div>"3"</div>
        <div>"4"</div>
      </Slider>
    </SliderContainer>
  );
};

export default DetailSlider;
