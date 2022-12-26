import styled from 'styled-components';
import UserInfo from './components/UserInfo';
import NavBar from '../../components/NavBar';
import DeleteUser from './components/DeleteUser';
import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import * as API from '../../api/API';
import axios from 'axios';

export type UserInfoType = {
  track: string;
  generation: number;
  name: string;
  email: string;
  phone: string;
  nickname: string;
  profile: string;
  role: string;
};

const MyPage = () => {
  const [profileimg, setProfileImg] = useState<File>();
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

  const isLoaded = useRef<boolean>(false);

  const getUserInfoAPI = async () => {
    const res = await API.get('/api/users');
    setUserInfo(res);
  };

  useEffect(() => {
    getUserInfoAPI();
  }, []);

  useEffect(() => {
    if (isLoaded.current) {
      const res = API.patch(`/api/users`, userInfo);
      console.log(res);
    }
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
          <ImgCircle alt="Profile Image" src={userInfo.profile} />
          <FileUpload
            onChange={updateProfileImg}
            type="file"
            accept="image/jpg,image/jpeg,image/png"
          />
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
  background-color: ${({ theme }) => theme.colors.background};
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 750px;
  padding: 50px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin: 50px 0px;
  color: ${({ theme }) => theme.font.color.darkGray};
  margin-left: 210px;
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
  margin-top: 30px;
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
  border: 1px solid black;
`;
const FileUpload = styled.input`
  margin-top: 10px;
`;
