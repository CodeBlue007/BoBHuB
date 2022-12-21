import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import CreateIcon from '@mui/icons-material/Create';
import UserInfo from './components/UserInfo';
import NavBar from '../../components/NavBar';
import DeleteUser from './components/DeleteUser';
import { useState, useEffect, useRef } from 'react';
import * as API from '../../api/API';
import axios from 'axios';
import React from 'react';
import edit from '../../assets/edit.png';

export type UserInfoType = {
  track: string;
  generation: number;
  name: string;
  email: string;
  phone: string;
  nickName: string;
  userId: number;
  profile: string;
  role: string;
};

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    track: '',
    generation: 0,
    name: '',
    email: '',
    phone: '',
    nickName: '',
    userId: 0,
    profile: '',
    role: '',
  });

  // 사용자 정보 조회 api
  const getUserInfoAPI = async () => {
    const res=await API.get('/api/users')
    setUserInfo(res);
    // console.log(res);
    // setUserInfo(res);
  };

  useEffect(() => {
    try {
      getUserInfoAPI();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleUpdateProfile = () => {};

  return (
    <Container>
      <Nav>
        <NavBar />
      </Nav>
      <Title>My Page</Title>
      <UserUpdate>
        <ImgContainer>
          <ImgCircle alt="Profile Image" src={userInfo.profile} />
          <FileUpload type="file" accept="image/jpg,image/jpeg,image/png" multiple />
          <UserName>{userInfo.name}</UserName>
          {/* <EditProfile onClick={handleUpdateProfile}>
                        <CreateIcon sx={{ color: 'white', backgroundColor: '#6a4a96', borderRadius: '5px' }} fontSize='small' />
                    </EditProfile> */}
          <UserRole>{userInfo.role === 'admin' ? '관리자' : '레이서'}</UserRole>
        </ImgContainer>
        <SubContainer>
          <SubTitle>회원정보</SubTitle>
          <UserInfo setUserInfo={setUserInfo} userInfo={userInfo} />
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
  background-color: #f3f2f5;
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
  color: #303030;
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

// const EditProfile = styled.div`
//     position:absolute;
//     top:105px;
//     right:48px;
// `

const ImgCircle = styled.img`
sx={{ marginTop: '50px', width: '75px', height: '75px' }}
    margin-top:50px;
    width:75px;
    height:75px;
    border-radius:50px;

`;
const FileUpload = styled.input`
  width: 75px;
  margin-top: 10px;
`;
