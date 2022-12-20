import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  TextFieldProps,
  Button,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import type { UserType } from './Users';
import styled from 'styled-components';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface UserDetailFormProps {
  user: UserType;
  fetchUserData: () => void;
  handleClose: () => void;
}

const initUserDetail = {
  name: '',
  id: '',
  email: '',
  auth: '',
  nickname: '',
};

const UserDetailForm = ({ user, fetchUserData, handleClose }: UserDetailFormProps) => {
  const nickname = useRef<TextFieldProps>();
  const auth = useRef<TextFieldProps>();

  const updateUserData = (body: { nickname: string; auth: string }) => {
    return axios.patch(`http://localhost:3001/users/${user.id}`, body);
  };

  const clickUpdateBtn = async () => {
    const body = {
      nickname: nickname.current?.value as string,
      auth: auth.current?.value as string,
    };
    await updateUserData(body);
    fetchUserData();
    handleClose();
  };
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        유저 정보
      </Typography>
      <Div>
        <label htmlFor="userName">이름</label>
        <TextField id="userName" type="text" defaultValue={user.name} disabled />
      </Div>
      <Div>
        <label htmlFor="email">이메일</label>
        <TextField id="email" type="text" defaultValue={user.email} disabled />
      </Div>
      <Div>
        <label htmlFor="nickname">닉네임</label>
        <TextField id="nickname" type="text" defaultValue={user.nickname} inputRef={nickname} />
      </Div>
      <Div>
        <label htmlFor="auth">권한</label>
        <Select defaultValue={user.auth} inputRef={auth}>
          <MenuItem value="racer">racer</MenuItem>
          <MenuItem value="admin">admin</MenuItem>
        </Select>
      </Div>
      <Div>
        <Button variant="outlined" onClick={clickUpdateBtn}>
          수정
        </Button>
      </Div>
    </Box>
  );
};

export default UserDetailForm;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
