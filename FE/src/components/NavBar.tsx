import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import logo from '../assets/BoBHuB_logo.png';
import title from '../assets/BoBHuB_textLogo.png';
import { Link } from 'react-router-dom';
import { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserData, userAction } from '../store/userSlice';
import type { AppDispatch, RootState } from '../store/store';
import { get } from '../api/API';
import MyParty from './MyParty';
import styled from 'styled-components';

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
  const handleOpenToggle = () => setOpen(!open);
  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useSelector<RootState>((state) => state.userReducer.isLogin);

  useEffect(() => {
    dispatch(loginUserData());
  }, []);

  const logout = () => {
    dispatch(userAction.logout());
    get('/api/auth/logout');
  };

  const fetchMyParty = async () => {
    handleOpenToggle();
    const myPartyList = await get('/api/parties/likedParty');
    // setMyPartyList([...myPartyList]);
    console.log(myPartyList);
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 'none' }}>
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
              <Button color="inherit" onClick={fetchMyParty}>
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
