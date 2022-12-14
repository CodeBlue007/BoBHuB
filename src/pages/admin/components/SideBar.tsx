import { Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Restaurant from '../Restraunt/Restaurant';
import Users from '../User/components/Users';

export type User = {
  name: string;
  id: string;
  email: string;
  auth: string;
};
const SideBar: React.FC = () => {
  return (
    <BrowserRouter basename="/admin">
      <Container>
        <SideBarTabs orientation="vertical" aria-label="basic tabs example">
          <Link to="/users">
            <Tab label="유저 관리" />
          </Link>
          <Link to="/restaurant">
            <Tab label="식당 관리" />
          </Link>
        </SideBarTabs>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/restaurant" element={<Restaurant />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default SideBar;

const SideBarTabs = styled(Tabs)`
  width: 200px;
  background-color: #dcf3fb;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
`;
