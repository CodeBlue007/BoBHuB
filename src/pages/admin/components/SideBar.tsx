import { Tabs, Tab } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Users from '../admin-user/components/Users';

export type User = {
  name: string;
  id: string;
};
const SideBar: React.FC = () => {
  const users: User[] = [
    {
      name: '김찬수0',
      id: 'rlackstn0',
    },
    {
      name: '김찬수1',
      id: 'rlackstn1',
    },
  ];
  return (
    <BrowserRouter>
      <SideBarTabs orientation="vertical" aria-label="basic tabs example">
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </SideBarTabs>
      <Routes>
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/restaurant" />
      </Routes>
    </BrowserRouter>
  );
};

export default SideBar;

const SideBarTabs = styled(Tabs)`
  width: 200px;
  background-color: #dcf3fb;
  height: 100%;
`;
