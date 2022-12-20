import axios from 'axios';
import UserTable from './UserTable';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

export type UserType = {
  userId: number;
  generation: number;
  track: string;
  name: string;
  nickName: string;
  email: string;
  phone: string;
  profile: any;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: any;
  deletedAt: any;
};

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const fetchUserData = async () => {
    const res = await axios('api/admin/users');
    const users: UserType[] = await res.data;
    setUsers([...users]);
  };

  const loginTest = async () => {
    const res = await axios.post('api/auth/login', {
      email: 'admin@elice.com',
      password: '1111',
    });
    console.log(res);
  };

  const logoutTest = async () => {
    const res = await axios.get('api/auth/logout');
    console.log(res);
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <Div>
      <H2>유저 조회</H2>
      <UserTable fetchUserData={fetchUserData} users={users} />
      <button
        onClick={async () => {
          await loginTest();
        }}>
        로그인로그인
      </button>
      <button
        onClick={async () => {
          await logoutTest();
        }}>
        로그아웃
      </button>
    </Div>
  );
};

export default Users;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H2 = styled.h2`
  margin-bottom: 50px;
  margin-top: 50px;
`;
