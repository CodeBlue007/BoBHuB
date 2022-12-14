import axios from 'axios';
import { User } from '../../components/SideBar';
import UserTable from './Usertable';
import { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const res = await axios('http://localhost:3001/users');
    const users = await res.data;
    console.log(users);
    setUsers(() => {
      return users;
    });
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <p>유저 조회</p>
      <UserTable users={users} />
    </div>
  );
};

export default Users;
