import { Fragment, useState, useEffect, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  Button,
} from '@mui/material';
import type { UserType } from './Users';
import UserModal from './UserModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { useNavigate } from 'react-router';

let selectUser: UserType;

const UserTable = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (user: UserType) => {
    selectUser = user;
    setOpen(true);
  };
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.adminUsersReducer.users);
  const handleClose = () => setOpen(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      if (users.length < 1) {
        alert('권한이 없습니다.');
        navigate('/');
      }
    } else {
      isMounted.current = true;
    }
  }, [users]);
  return (
    <Fragment>
      <UserModal handleClose={handleClose} open={open} user={selectUser} />
      <TableContainer component={Paper} sx={{ overflowY: 'scroll', maxHeight: '60vh' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">닉네임</TableCell>
              <TableCell align="center">권한</TableCell>
              <TableCell align="center">수정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.userId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.nickname}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" onClick={() => handleOpen(user)}>
                    정보 조회
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow sx={{ opacity: '0.3', color: 'black' }}>
                <TableCell align="center" colSpan={5}>
                  <p>데이터가 없습니다.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default UserTable;
