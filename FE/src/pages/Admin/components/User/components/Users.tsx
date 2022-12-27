import UserTable from './UserTable';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { get } from '../../../../../api/API';

export type UserType = {
  userId: number;
  generation: number;
  track: string;
  name: string;
  nickname: string;
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
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const users: UserType[] = await get('/api/admin/users');
    setUsers([...users]);
  };

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
