import styled from 'styled-components';
import UserInfo from './components/UserInfo';
import NavBar from '../../components/NavBar';
import DeleteUser from './components/DeleteUser';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import * as API from '../../api/API';
import axios from 'axios';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import UserProfile from '../../assets/userprofile.png';
import Footer from '../../components/Footer';

export type UserInfoType = {
  track: string;
  generation: number;
  name: string;
  email: string;
  phone: string;
  nickname: string;
  profile: string;
  role: string;
  password: string;
  newPassword: string;
};

const MyPage = () => {
  const [profileimg, setProfileImg] = useState<File>();
  const navigate = useNavigate();
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

  const isLoaded = useRef<boolean>(false);

  const getUserInfoAPI = async () => {
    try {
      const res = await API.get('/api/users');
      if (!res) {
        throw new Error('로그인이 필요한 서비스입니다.');
      }
      setUserInfo(res);
    } catch (err) {
      alert(err);
      navigate('/');
    }
  };

  useEffect(() => {
    getUserInfoAPI();
  }, []);

  useEffect(() => {
    (async () => {
      if (isLoaded.current) {
        const res = await API.patch(`/api/users`, userInfo);
      }
    })();
  }, [userInfo]);

  const updateProfileImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const files = (e.target.files as FileList)[0];

    if (files === undefined) return;
    else {
      formData.append('profile', files);
      const res = await axios.post(`/api/users/image`, formData, { withCredentials: true });
      setProfileImg(files);
      getUserInfoAPI();
    }
  };

  return (
    <Container>
      <Nav>
        <NavBar />
      </Nav>
      <Title>My Page</Title>
      <UserUpdate>
        <ImgContainer>
          <ImgCircle alt="Profile Image" src={userInfo.profile ? userInfo.profile : UserProfile} />
          <IconButton sx={{ position: 'absolute', top: '95px', right: '35px' }} component="label">
            <AddAPhotoIcon color="secondary" />
            <input
              onChange={updateProfileImg}
              type="file"
              accept="image/jpg,image/jpeg,image/png"
              hidden
            />
          </IconButton>
          <UserName>{userInfo.name}</UserName>
          <UserRole>{userInfo.role === 'admin' ? '관리자' : '레이서'}</UserRole>
        </ImgContainer>
        <SubContainer>
          <SubTitle>회원정보</SubTitle>
          <UserInfo setUserInfo={setUserInfo} userInfo={userInfo} isLoaded={isLoaded} />
          <DeleteTitle>계정탈퇴</DeleteTitle>
          <DeleteUser />
        </SubContainer>
      </UserUpdate>
      <Footer />
    </Container>
  );
};

export default MyPage;

const Nav = styled.div`
  display: absolute;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f4f0;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  padding: 50px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 70px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin: 70px 0 50px 210px;
  color: ${({ theme }) => theme.font.color.subTitle};
`;

const SubTitle = styled.h3`
  font-weight: bold;
  margin: 20px 0;
`;

const DeleteTitle = styled(SubTitle)`
  margin-top: 80px;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
  position: relative;
  width: 180px;
  height: 280px;
  align-items: center;
  margin-right: 30px;
`;

const UserUpdate = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserName = styled.h3`
  font-weight: bold;
  margin-top: 50px;
`;

const UserRole = styled.div`
  font-weight: lighter;
  font-size: 11px;
  margin-top: 11px;
`;

const ImgCircle = styled.img`
  margin-top: 50px;
  width: 75px;
  height: 75px;
  border-radius: 50px;
`;
