import { AppBar, IconButton, Toolbar, Typography, Stack, Button } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <IconButton>
            <FastfoodIcon />
          </IconButton>
        </Link>
        <Typography fontSize={30} component="div" sx={{ flexGrow: 1 }}>
          Bobhub
        </Typography>
        <Stack direction="row" spacing={2}>
          <Link to="/userGuide" style={{ color: 'white', textDecoration: 'none' }}>
            <Button color="inherit">밥허브 이용가이드</Button>
          </Link>
          <Link to="/mypage" style={{ color: 'white', textDecoration: 'none' }}>
            <Button color="inherit">마이페이지</Button>
          </Link>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
            <Button color="inherit">로그인</Button>
          </Link>
          <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
            <Button color="inherit">회원가입</Button>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
