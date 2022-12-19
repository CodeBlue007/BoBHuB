import { Fragment, useState } from 'react';
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

let selectUser: UserType;

interface UserTableProps {
  users: UserType[];
  fetchUserData: () => void;
}

const UserTable = ({ users, fetchUserData }: UserTableProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (user: UserType) => {
    selectUser = user;
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <Fragment>
      <UserModal
        fetchUserData={fetchUserData}
        handleClose={handleClose}
        open={open}
        user={selectUser}
      />
      <TableContainer component={Paper}>
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
              <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.nickname}</TableCell>
                <TableCell align="center">{user.auth}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" onClick={() => handleOpen(user)}>
                    정보 조회
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default UserTable;
