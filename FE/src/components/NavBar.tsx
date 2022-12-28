import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import logo from '../assets/BoBHuB_logo.png';
import title from '../assets/BoBHuB_textLogo.png';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, Fragment, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserData, logoutUser } from '../store/userSlice';
import type { AppDispatch, RootState } from '../store/store';
import { get } from '../api/API';
import MyParty from './MyParty';
import styled from 'styled-components';
import { theme } from './../styles/theme';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import UserGuide from './UserGuide/UserGuide';
import { SocketContext } from '../socket/SocketContext';
import type { Party } from '../pages/MainPage/Type';
import { getMyPartyList } from './../store/partySlice';

const ModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useSelector<RootState>((state) => state.userReducer.isLogin);
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const socket = useContext(SocketContext);
  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);

  useEffect(() => {
    dispatch(loginUserData());
    dispatch(getMyPartyList());
    socket.on('joinSuccess', (msg) => {
      alert(msg);
      dispatch(getMyPartyList());
    });
  }, []);

  useEffect(() => {
    if (open === true) {
      setOpen(false);
    }
  }, [isLogin]);

  const handleOpenToggle = () => setOpen(!open);

  const logout = () => {
    dispatch(logoutUser());
  };

  const handleLikedParty = () => {
    handleOpenToggle();
    dispatch(getMyPartyList());
  };

  return (
    <AppBar
      sx={{
        bgcolor: location.pathname !== '/' ? theme.colors.main : 'transparent',
        boxShadow: 'none',
        position: location.pathname !== '/' ? 'static' : 'absolute',
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
          <Button onClick={handleOpen} sx={{ color: 'white' }}>
            밥허브 이용가이드
          </Button>
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

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={modal}>
            <Box sx={ModalStyle}>
              <UserGuide />
            </Box>
          </Fade>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
