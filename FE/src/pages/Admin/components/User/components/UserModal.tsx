import { Box, Typography, Modal, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { UserType } from './Users';
import { useState, useEffect } from 'react';
import axios from 'axios';

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

const UserDetailForm = ({ user, fetchUserData, handleClose }: UserDetailFormProps) => {
  const [userdetail, setUserDetail] = useState({});
  useEffect(() => {
    setUserDetail(() => {
      return user;
    });
  }, [user]);

  const updateUserData = (body: any) => {
    return axios.put(`http://localhost:3001/users/${user.id}`, body);
  };

  const onChangeHandler = (event: SelectChangeEvent<string>) => {
    setUserDetail((state) => {
      return {
        ...state,
        auth: event.target.value,
      };
    });
  };
  const clickUpdateBtn = async () => {
    await updateUserData(userdetail);
    fetchUserData();
    handleClose();
  };
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        유저 정보
      </Typography>
      <label htmlFor="userName">이름</label>
      <input type="text" value={user.name} disabled />
      <label htmlFor="userName">이메일</label>
      <input type="text" value={user.email} disabled />
      <label htmlFor="userName">권한</label>
      <Select defaultValue={user.auth} onChange={onChangeHandler}>
        <MenuItem value="racer">racer</MenuItem>
        <MenuItem value="admin">admin</MenuItem>
      </Select>
      <button onClick={clickUpdateBtn}>수정</button>
    </Box>
  );
};

interface UserModalProps {
  handleClose: () => void;
  open: boolean;
  user: UserType;
  fetchUserData: () => void;
}

const UserModal = ({ open, handleClose, user, fetchUserData }: UserModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <UserDetailForm handleClose={handleClose} fetchUserData={fetchUserData} user={user} />
      </Modal>
    </div>
  );
};

export default UserModal;
