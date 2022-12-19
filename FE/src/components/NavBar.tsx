import { AppBar, IconButton, Toolbar, Typography, Stack, Button } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton>
          <FastfoodIcon />
        </IconButton>
        <Typography fontSize={30} component="div" sx={{ flexGrow: 1 }}>
          Bobhub
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit">마이페이지</Button>
          <Button color="inherit">로그인</Button>
          <Button color="inherit">회원가입</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
