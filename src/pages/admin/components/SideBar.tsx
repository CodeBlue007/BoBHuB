import { List, ListItem, ListItemButton, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Restaurant from '../Restraunt/Restaurant';
import Users from '../User/components/Users';
import HomeIcon from '@mui/icons-material/Home';

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
        <CustomList disablePadding>
          <CustomListItem sx={{ fontSize: '34px' }}>Bobhub admin</CustomListItem>
          <StyledLink to="/admin/users">
            <CustomListItem>
              <CustomButton>유저관리</CustomButton>
            </CustomListItem>
          </StyledLink>
          <StyledLink to="/admin/restaurant">
            <CustomListItem>
              <CustomButton>식당관리</CustomButton>
            </CustomListItem>
          </StyledLink>
          <Link to="/">
            <IconButton sx={{ bgcolor: '#ffffff', position: 'relative', top: '55vh' }}>
              <HomeIcon fontSize="large" />
            </IconButton>
          </Link>
        </CustomList>
        <Routes>
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/restaurant" element={<Restaurant />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default SideBar;

const Container = styled.div`
  display: flex;
`;

const CustomList = styled(List)`
  && {
    width: 200px;
    background-color: #cbcecf;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const CustomListItem = styled(ListItem)`
  && {
    width: 200px;
    padding: auto;
    text-align: center;
    box-sizing: border-box;
  }
`;

const CustomButton = styled(ListItemButton)`
  && {
    width: 200px;
    padding: 20px 30px 20px 30px;
    text-align: center;
    color: black;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
