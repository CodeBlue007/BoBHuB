import { List, ListItem, ListItemButton } from '@mui/material';
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
        <List disablePadding sx={{ width: '200px', backgroundColor: '#cbcecf', height: '100vh' }}>
          <ListItem>Bobhub admin</ListItem>
          <Link to="/users">
            <ListItem>
              <ListItemButton
                sx={{ width: '200px', padding: '20px 30px 20px 30px', boxSizing: 'border-box' }}>
                유저관리
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/restaurant">
            <ListItem>
              <ListItemButton sx={{ width: '200px', padding: '20px 30px 20px 30px' }}>
                식당관리
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/restaurant" element={<Restaurant />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default SideBar;

const Container = styled.div`
  display: flex;
`;
