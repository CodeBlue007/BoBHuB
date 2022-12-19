import { Table, TableRow, TableHeader, TableData, WarningMessage } from './UserInfo';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import React from 'react';
import * as API from '../../FoodList/API';

const DeleteUser = () => {

    const deleteUserAPI = async () => {
        await API.delete(`http://localhost:5000/api/user/auth`);
    }

    const handleUserDelete = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            deleteUserAPI();
            alert('계정 탈퇴되었습니다.');
            window.location.href = '/';
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Table>
            <TableRow>
                <TableHeader>계정탈퇴</TableHeader>
                <TableData>
                    <Button onClick={handleUserDelete} sx={{ fontWeight: 'bold' }} variant="outlined" color="error">
                        계정탈퇴
                    </Button>
                    <DeleteCheckMessage>*계정 탈퇴 시, 복구 불가능합니다.</DeleteCheckMessage>
                </TableData>
            </TableRow>
        </Table>
    )
}

export default DeleteUser;

const DeleteCheckMessage = styled(WarningMessage)`
    color:red;
`