import styled from 'styled-components';
import { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img_1 from '../../../assets/images/img_1.jpg';
import img_2 from '../../../assets/images/img_2.jpg';
import img_3 from '../../../assets/images/img_3.jpg';
import img_4 from '../../../assets/images/img_4.jpg';
import img_5 from '../../../assets/images/img_5.jpg';
import img_6 from '../../../assets/images/img_6.jpg';
import img_7 from '../../../assets/images/img_7.jpg';
import img_8 from '../../../assets/images/img_8.jpg';
import img_9 from '../../../assets/images/img_9.jpg';
import img_10 from '../../../assets/images/img_10.jpg';

const Div = styled.div`
  width: 95%;
  height: 500px;
  background-color: skyblue;
  position: absolute;
  top: 800px;
  left: 10px;
  right: 10px;
  margin: 20px;
  .slick-prev:before {
    opaicty: 1;
    color: black;
    left: 0;
  }
  .slick-next:before {
    opacity: 1;
    color: black;
  }

  img {
    padding: 20px;
    object-fit: filled;
    height: 400px;
  }
`;

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      draggable: true,
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
        <h2>오늘 뭐 먹지?</h2>
        <Slider {...settings}>
          <div>
            <img src={img_1} alt="img_1" />
          </div>
          <div>
            <img src={img_2} alt="img_2" />
          </div>
          <div>
            <img src={img_3} alt="img_3" />
          </div>
          <div>
            <img src={img_4} alt="img_4" />
          </div>
          <div>
            <img src={img_5} alt="img_5" />
          </div>
          <div>
            <img src={img_6} alt="img_6" />
          </div>
          <div>
            <img src={img_7} alt="img_7" />
          </div>
          <div>
            <img src={img_8} alt="img_8" />
          </div>
          <div>
            <img src={img_9} alt="img_9" />
          </div>
          <div>
            <img src={img_10} alt="img_10" />
          </div>
        </Slider>
      </Div>
    );
  }
}
