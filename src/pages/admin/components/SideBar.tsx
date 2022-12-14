import { Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Users from '../User/components/Users';

export type User = {
  name: string;
  id: string;
  email: string;
  auth: string;
};
const SideBar: React.FC = () => {
  return (
    <BrowserRouter>
      <Container>
        <SideBarTabs orientation="vertical" aria-label="basic tabs example">
          <Link to="/users">
            <Tab label="유저 관리" />
          </Link>
          <Tab label="식당 관리" />
        </SideBarTabs>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/restaurant" />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default SideBar;

const SideBarTabs = styled(Tabs)`
  width: 200px;
  background-color: #dcf3fb;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
`;
