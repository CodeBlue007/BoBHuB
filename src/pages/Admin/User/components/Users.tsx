import axios from 'axios';
import UserTable from './UserTable';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

export type UserType = {
  name: string;
  id: string;
  email: string;
  auth: string;
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const fetchUserData = async () => {
    const res = await axios('http://localhost:3001/users');
    const users = await res.data;
    setUsers(() => {
      return users;
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <Div>
      <H2>유저 조회</H2>
      <UserTable fetchUserData={fetchUserData} users={users} />
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
