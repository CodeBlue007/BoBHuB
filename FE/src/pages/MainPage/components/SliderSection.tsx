import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { fetchParties } from './../api/api';
import { get } from '../../../api/API';
import { Party } from '../Type';
import { UserInfoType } from '../../MyPage/MyPage';
import SliderItem from './SliderItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { SocketContext } from './../../../socket/SocketContext';
import { getActivePartyList } from '../../../store/partySlice';

const StyledSlider = styled(Slider)`
  height: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
  }
  .slick-slide div {
    cursor: pointer;
  }
  .slick-prev:hover {
    color: ${(props) => props.theme.colors.main};
  }
  .slick-next:hover {
    color: ${(props) => props.theme.colors.main};
  }
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 45vh;
  position: relative;
  box-sizing: border-box;
`;

const DivNext = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  text-align: right;
  font-size: 100px;
  color: ${({ theme }) => theme.font.color.description};
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
  color: ${(props) => props.theme.colors.emphasis};
  line-height: 40px;
`;

interface DivProps {
  length: number;
  max: number;
}

const Div = styled.div<DivProps>`
  // height: 100%;
  background-color: ${(props) => props.theme.colors.background};
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
    border-radius: 15px;
    height: 90%;
    text-align: center;
    position: relative;
  } //item

  .slide {
    opacity: ${({ length, max }) => (length > max ? 0.5 : 1)};
    transform: ${({ length, max }) => (length > max ? 'scale(0.7)' : 'scale(1)')};
    transition: 0.3s;
    filter: blur (5px);
  }
  .slide-center {
    opacity: 1;
    transform: scale(1);
  }

  img {
    margin: 0 auto 10px auto;
    height: 290px;
    overflow: hidden;
    width: 100%;
    border-radius: 10px;
  }

  span {
    top: 150px;
    color: black;
    /* font-size: 2rem; */
    font-weight: bold;
    margin-bottom: 5px;
  }

  .login_msg {
    height: 30px;
    font-size: 2em;
    margin: 30px 30px 30px 30px;
    color: ${({ theme }) => theme.font.color.description};
    font-weight: bold;
    text-align: center;
    letter-spacing: 4px;
  }
`;

const TitleBox = styled.div`
  height: 30px;
  font-size: 2em;
  margin: 30px 30px 30px 30px;
  color: ${({ theme }) => theme.font.color.description};
  font-weight: bold;
  text-align: center;
  letter-spacing: 4px;
`;

export default function SimpleSlider() {
  const showMaxCnt = 3;
  const parties = useSelector((state: RootState) => state.partySliceReducer.activePartyList);
  const settings = {
    dots: false,
    className: 'center',
    centerPadding: '0px',
    centerMode: true,
    infinite: parties.filter((party) => party.likedNum !== party.partyLimit).length > showMaxCnt,
    speed: 500,
    slidesToShow: showMaxCnt,
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

  const [userInfo, setUserInfo] = useState<UserInfoType>({
    track: '',
    generation: 0,
    name: '',
    email: '',
    phone: '',
    nickname: '',
    profile: '',
    role: '',
    password: '',
    newPassword: '',
  });

  const [slideIndex, setSlideIndex] = useState(0);
  const socket = useContext(SocketContext);
  const userId = useSelector<RootState>((state) => state.userReducer.currentUser.userId);

  const dispatch = useDispatch<AppDispatch>();
  const setPartiesData = () => {
    dispatch(getActivePartyList());
  };

  useEffect(() => {
    socket.on('leaveSuccess', setPartiesData);
    socket.on('joinSuccess', setPartiesData);
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
    <Div
      length={parties.filter((party) => party.likedNum !== party.partyLimit).length}
      max={showMaxCnt}>
      {userInfo ? (
        <TitleBox>
          밥메이트들이 <span style={{ color: '#E59A59' }}>{userInfo.name}</span>님을 기다리고
          있어요!
        </TitleBox>
      ) : (
        <div className="login_msg">로그인 후 이용해주세요!</div>
      )}

      <div>
        {parties.length === 0 && (
          <LabelContainer>
            <div>활성화된 식당이 없습니다.</div>
          </LabelContainer>
        )}
        {parties.length >= 4 && (
          <StyledSlider {...settings}>
            {parties
              .filter((party) => party.likedNum !== party.partyLimit)
              .map((party, index) => (
                <SliderItem
                  index={index}
                  slideIndex={slideIndex}
                  party={party}
                  key={party.shopId}
                />
              ))}
          </StyledSlider>
        )}
        {parties.length <= 3 && (
          <div>
            {parties
              .filter((party) => party.likedNum !== party.partyLimit)
              .map((party, index) => (
                <SliderItem
                  index={index}
                  slideIndex={slideIndex}
                  party={party}
                  key={party.shopId}
                />
              ))}
          </div>
        )}
      </div>
    </Div>
  );
}
