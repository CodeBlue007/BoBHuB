import { Table, TableRow, TableHeader, TableData, WarningMessage } from './UserInfo';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import React from 'react';
import * as API from '../../../api/API';
import { useNavigate } from 'react-router';

const DeleteUser = () => {
  const navigate = useNavigate();
  const deleteUserAPI = async () => {
    await API.delete(`/api/users`);
    navigate('/', { replace: true });
  };

  const handleUserDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!window.confirm('정말 계정을 삭제하시겠습니까?')) {
      alert('계정 삭제를 취소하셨습니다.');
    } else {
      try {
        deleteUserAPI();
        alert('계정 탈퇴되었습니다.');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Table>
      <TableRow>
        <TableHeader>계정탈퇴</TableHeader>
        <TableData>
          <Button
            onClick={handleUserDelete}
            sx={{ fontWeight: 'bold' }}
            variant="contained"
            color="error">
            계정탈퇴
          </Button>
          <DeleteCheckMessage>*계정 탈퇴 시, 복구 불가능합니다.</DeleteCheckMessage>
        </TableData>
      </TableRow>
    </Table>
  );
};

export default DeleteUser;

const DeleteCheckMessage = styled(WarningMessage)`
  color: red;
`;
