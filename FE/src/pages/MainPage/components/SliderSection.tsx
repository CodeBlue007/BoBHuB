import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { fetchParties } from '../api/api';
import { get } from '../../../api/API';
import { Party } from '../Type';
import { UserInfoType } from '../../MyPage/MyPage';
import SliderItem from './SliderItem';

const StyledSlider = styled(Slider)`
  border: 1px solid black;
  height: 45vh;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
  }
  .slick-slide div {
    cursor: pointer;
  }
  .slick-prev:hover {
    color: #e59a59;
  }
  .slick-next:hover {
    color: #e59a59;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 45vh;
  position: relative;
  border: 1px solid black;
  box-sizing: border-box;
`;

const DivNext = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  text-align: right;
  font-size: 100px;
  color: #712e1e;
  right: 100px;
  top: 120px;
  line-height: 40px;
`;

const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 120px;
  left: 25px;
  z-index: 99;
  text-align: left;
  font-size: 100px;
  color: #712e1e;
  line-height: 40px;
`;

const Div = styled.div`
  height: 100%;
  background-color: #fffaf5;
  box-sizing: border-box;
  width: 100%;
  place-items: center;

  .slick-slider {
    padding: 0 15px;
  } //slider

  .slick-list {
    margin-right: -15px;
    margin-left: -15px;
  } //parent

  .slick-slide {
    background-color: white;
    border-radius: 15px;
    height: 350px;
    text-align: center;
    position: relative;
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
    margin-bottom: 5px;
  }

  .login_msg {
    height: 30px;
    font-size: 2em;
    margin: 30px 30px 30px 30px;
    color: #424140;
    font-weight: bold;
    text-align: center;
    letter-spacing: 4px;
  }
`;

const TitleBox = styled.div`
  height: 30px;
  font-size: 2em;
  margin: 30px 30px 30px 30px;
  color: #424140;
  font-weight: bold;
  text-align: center;
  letter-spacing: 4px;
`;

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
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    track: '',
    generation: 0,
    name: '',
    email: '',
    phone: '',
    nickname: '',
    profile: '',
    role: '',
  });

  const [slideIndex, setSlideIndex] = useState(0);

  const setPartiesData = async () => {
    const data: Party[] = await fetchParties();
    console.log(data);
    setParties([...data]);
  };

  useEffect(() => {
    setPartiesData();
  }, []);

  const getUserInfoAPI = async () => {
    const res = await get('/api/users');
    setUserInfo(res);
  };

  useEffect(() => {
    try {
      getUserInfoAPI();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Div>
      {userInfo ? (
        <TitleBox>
          밥메이트들이 <span>{userInfo.name}</span>님을 기다리고 있어요!
        </TitleBox>
      ) : (
        <div className="login_msg">로그인 후 이용해주세요!</div>
      )}

      <div>
        {parties.length === 0 ? (
          <LabelContainer>
            <div>활성화된 식당이 없습니다.</div>
          </LabelContainer>
        ) : (
          <StyledSlider {...settings}>
            {parties.map((party, index) => (
              <SliderItem index={index} slideIndex={slideIndex} party={party} key={party.shopId} />
            ))}
          </StyledSlider>
        )}
      </div>
    </Div>
  );
}
