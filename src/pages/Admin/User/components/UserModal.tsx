import { Box, Typography, Modal, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { User } from '../../components/SideBar';
import { ChangeEvent, useState, useEffect } from 'react';
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

const UserDetailForm: React.FC<{ user: User | undefined }> = (props) => {
  const [userdetail, setUserDetail] = useState({});
  useEffect(() => {
    setUserDetail(() => {
      return props.user;
    });
  }, []);

  const updateUserData = (body: any) => {
    return axios.put(`http://localhost:3001/users/${props.user?.id}`, body);
  };

  const onChangeHandler = (event: SelectChangeEvent<string>) => {
    setUserDetail((state) => {
      return {
        ...state,
        auth: event.target.value,
      };
    });
  };
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        유저 정보
      </Typography>
      <label htmlFor="userName">이름</label>
      <input type="text" value={props.user?.name} disabled />
      <label htmlFor="userName">이메일</label>
      <input type="text" value={props.user?.email} disabled />
      <label htmlFor="userName">권한</label>
      <Select defaultValue={props.user?.auth} onChange={onChangeHandler}>
        <MenuItem value="racer">racer</MenuItem>
        <MenuItem value="admin">admin</MenuItem>
      </Select>
      <button onClick={() => updateUserData(userdetail)}>수정</button>
    </Box>
  );
};

const UserModal: React.FC<{ handleClose: () => void; open: boolean; user: User | undefined }> = (
  props,
) => {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <UserDetailForm user={props.user} />
      </Modal>
    </div>
  );
};

export default UserModal;
