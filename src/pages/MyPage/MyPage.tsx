import styled from 'styled-components';
import UserInfo from './components/UserInfo';
import NavBar from '../../components/NavBar';
import DeleteUser from './components/DeleteUser';
import { useState, useEffect } from 'react';
import * as API from '../FoodList/API';

export type UserInfoType = {
    track: string;
    generation: number;
    name: string;
    email: string;
    phone: string;
    nickName: string;
    userId: number;
};

const MyPage = () => {
    const [userInfo, setUserInfo] = useState<UserInfoType>({ track: '', generation: 0, name: '', email: '', phone: '', nickName: '', userId: 0 });

    // 사용자 정보 조회 api
    const getUserInfoAPI = async () => {
        setUserInfo(await API.get(`http://localhost:4000/user`));
    }

    useEffect(() => {
        try {
            getUserInfoAPI();
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <Container>
            <Nav>
                <NavBar />
            </Nav>
            <Title>
                My Page
            </Title>
            <SubContainer>
                <SubTitle>회원정보</SubTitle>
                <UserInfo userInfo={userInfo} />
                <DeleteTitle>계정탈퇴</DeleteTitle>
                <DeleteUser />
            </SubContainer>
        </Container>
    )
}

export default MyPage;

const Nav = styled.div`
    display:absolute;
    width:100%;

`
const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:#f3f2f5;
`

const SubContainer = styled.div`
    display:flex;
    flex-direction:column;
    padding:44px;
    margin-top:10px;
    border-radius:10px;
    background-color:white;
    width:1200px;
    margin-left: 50px;
    margin-bottom:50px;
`

const Title = styled.h1`
    font-weight:bold;
    font-size:32px;
    margin:50px 0px;
    color:#303030;
`

const SubTitle = styled.h3`
    font-weight: bold;
    margin:20px 0;
`

const DeleteTitle = styled(SubTitle)`
    margin-top:80px;
`