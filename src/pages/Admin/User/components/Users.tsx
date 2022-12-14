import axios from 'axios';
import { User } from '../../components/SideBar';
import UserTable from './Usertable';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

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
      <UserTable users={users} />
    </Div>
  );
};

export default Users;

const Div = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H2 = styled.h2`
  margin-bottom: 50px;
  margin-top: 50px;
`;
