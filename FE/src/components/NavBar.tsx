import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import logo from '../assets/BoBHuB_logo.png';
import title from '../assets/BoBHuB_textLogo.png';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserData, logoutUser } from '../store/userSlice';
import type { AppDispatch, RootState } from '../store/store';
import { get } from '../api/API';
import MyParty from './MyParty';
import styled from 'styled-components';
import { theme } from './../styles/theme';

const BasicLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 32px;
  margin-top: 2px;
  margin-right: 7px;
`;

const TitleLogo = styled.img`
  width: 140px;
  margin-top: 15px;
`;

const NavBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [myPartyList, setMyPartyList] = useState<[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useSelector<RootState>((state) => state.userReducer.isLogin);
  const location = useLocation();

  useEffect(() => {
    dispatch(loginUserData());
  }, []);

  const handleOpenToggle = () => setOpen(!open);

  const logout = () => {
    dispatch(logoutUser());
  };

  const handleLikedParty = async () => {
    handleOpenToggle();
    const myPartyList = await get('/api/parties/likedParty');
    // setMyPartyList([...myPartyList]);
    console.log(myPartyList);
  };

  return (
    <AppBar
      sx={{
        bgcolor: location.pathname !== '/' ? theme.colors.main : 'transparent',
        boxShadow: 'none',
        position: location.pathname !== '/' ? 'static' : '',
      }}>
      <Toolbar>
        <BasicLink to="/">
          <Logo src={logo} alt="BoBHuB logo" />
        </BasicLink>
        <Typography fontSize={30} component="div" sx={{ flexGrow: 1 }}>
          <BasicLink to="/">
            <TitleLogo src={title} alt="BoBHuB titleLogo" />
          </BasicLink>
        </Typography>
        <Stack direction="row" spacing={2}>
          <BasicLink to="/userGuide">
            <Button color="inherit">밥허브 이용가이드</Button>
          </BasicLink>
          {isLogin ? (
            <Fragment>
              <BasicLink to="/mypage">
                <Button color="inherit">마이페이지</Button>
              </BasicLink>
              <Button color="inherit" onClick={handleLikedParty}>
                찜 목록
              </Button>
            </Fragment>
          ) : (
            <div></div>
          )}
          {isLogin ? (
            <BasicLink to="/">
              <Button onClick={logout} color="inherit">
                로그아웃
              </Button>
            </BasicLink>
          ) : (
            <Fragment>
              <BasicLink to="/login">
                <Button color="inherit">로그인</Button>
              </BasicLink>
              <BasicLink to="/register">
                <Button color="inherit">회원가입</Button>
              </BasicLink>
            </Fragment>
          )}
        </Stack>
        <MyParty handleClose={handleOpenToggle} open={open} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
