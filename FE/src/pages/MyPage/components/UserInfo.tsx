import { useState } from 'react';
import styled from 'styled-components';
import CreateIcon from '@mui/icons-material/Create';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { UserInfoType } from '../MyPage';

interface UserType {
    userInfo: UserInfoType;
}

const UserInfo = ({ userInfo }: UserType) => {
    const [userInfoEditing, setUserInfoEditing] = useState({ isNameEditing: false, isNickEditing: false, isPhoneEditing: false, isEmailEditing: false, isPWEditing: false });

    const handleClickUpdate = (e: React.MouseEvent<HTMLElement>, editTarget: string) => {
        e.preventDefault();
        switch (editTarget) {
            case 'name':
                setUserInfoEditing({ isNameEditing: true, isNickEditing: false, isPhoneEditing: false, isEmailEditing: false, isPWEditing: false });
                break;
            case 'nick':
                setUserInfoEditing({ isNameEditing: false, isNickEditing: true, isPhoneEditing: false, isEmailEditing: false, isPWEditing: false });
                break;
            case 'phone':
                setUserInfoEditing({ isNameEditing: false, isNickEditing: false, isPhoneEditing: true, isEmailEditing: false, isPWEditing: false });
                break;
            case 'email':
                setUserInfoEditing({ isNameEditing: false, isNickEditing: false, isPhoneEditing: false, isEmailEditing: true, isPWEditing: false });
                break;
            case 'password':
                setUserInfoEditing({ isNameEditing: false, isNickEditing: false, isPhoneEditing: false, isEmailEditing: false, isPWEditing: true });
                break;
        }
    }

    const clickBtn_changeEditState = (editTarget: string) => {
        switch (editTarget) {
            case 'name':
                setUserInfoEditing({ ...userInfoEditing, isNameEditing: false });
                break;
            case 'nick':
                setUserInfoEditing({ ...userInfoEditing, isNickEditing: false });
                break;
            case 'phone':
                setUserInfoEditing({ ...userInfoEditing, isPhoneEditing: false });
                break;
            case 'email':
                setUserInfoEditing({ ...userInfoEditing, isEmailEditing: false });
                break;
            case 'password':
                setUserInfoEditing({ ...userInfoEditing, isPWEditing: false });
        }
    }

    const handleClickSuccess = (e: React.MouseEvent<HTMLElement>, editSuccess: string) => {
        e.preventDefault();
        clickBtn_changeEditState(editSuccess);
    }

    const handleClickCancel = (e: React.MouseEvent<HTMLElement>, editCancel: string) => {
        e.preventDefault();
        clickBtn_changeEditState(editCancel);
    }

    return (
        <Table>
            <TableRow>
                <TableHeader>이름</TableHeader>
                {userInfoEditing.isNameEditing ?
                    (<>
                        <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 }, }}>
                            <TextField sx={{ height: '45px' }} color="secondary" size='small' id="demo-helper-text-misaligned-no-helper" label="Name" />
                        </Box>
                        <Stack direction="row">
                            <Button sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="outlined" onClick={(e) => handleClickCancel(e, 'name')}>취소</Button>
                            <Button sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="contained" onClick={(e) => handleClickSuccess(e, 'name')}>완료</Button>
                        </Stack>
                    </>) :
                    (<TableData>
                        {userInfo.name}
                        <UpdateIcon onClick={(e) => handleClickUpdate(e, 'name')}>
                            <CreateIcon sx={{ color: '#6a4a96' }} fontSize='small' />
                        </UpdateIcon>
                    </TableData>)
                }
            </TableRow>
            <TableRow>
                <TableHeader>트랙 / 기수</TableHeader>
                <TableData>
                    {`${userInfo.track} ${userInfo.generation}기`}
                    <WarningMessage>*최초 등록 후, 변경 불가합니다.</WarningMessage>
                </TableData>
            </TableRow>
            <TableRow>
                <TableHeader>닉네임</TableHeader>
                {userInfoEditing.isNickEditing ?
                    (<>
                        <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
                            <TextField sx={{ height: '45px' }} color="secondary" size='small' id="demo-helper-text-misaligned-no-helper" label="Nickname" />
                        </Box>
                        <Stack direction="row">
                            <Button sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="outlined" onClick={(e) => handleClickCancel(e, 'nick')}>취소</Button>
                            <Button sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="contained" onClick={(e) => handleClickSuccess(e, 'nick')}>완료</Button>
                        </Stack>
                    </>) :
                    (<TableData>
                        {userInfo.nickName}
                        <UpdateIcon onClick={(e) => handleClickUpdate(e, 'nick')}>
                            <CreateIcon sx={{ color: '#6a4a96' }} fontSize='small' />
                        </UpdateIcon>
                    </TableData>)
                }
            </TableRow>
            <TableRow>
                <TableHeader>휴대폰 번호</TableHeader>
                {userInfoEditing.isPhoneEditing ?
                    (<>
                        <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
                            <TextField sx={{ height: '45px' }} color="secondary" size='small' id="demo-helper-text-misaligned-no-helper" label="Phone" />
                        </Box>
                        <Stack direction="row">
                            <Button sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="outlined" onClick={(e) => handleClickCancel(e, 'phone')}>취소</Button>
                            <Button sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="contained" onClick={(e) => handleClickSuccess(e, 'phone')}>완료</Button>
                        </Stack>
                    </>) :
                    (<TableData>
                        {userInfo.phone}
                        <UpdateIcon onClick={(e) => handleClickUpdate(e, 'phone')}>
                            <CreateIcon sx={{ color: '#6a4a96' }} fontSize='small' />
                        </UpdateIcon>
                    </TableData>)
                }
            </TableRow>
            <TableRow>
                <TableHeader>이메일</TableHeader>
                {userInfoEditing.isEmailEditing ?
                    (<>
                        <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}
                        >
                            <TextField sx={{ height: '45px' }} color="secondary" size='small' id="demo-helper-text-misaligned-no-helper" label="Phone" />
                        </Box>
                        <Stack direction="row">
                            <Button sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="outlined" onClick={(e) => handleClickCancel(e, 'email')}>취소</Button>
                            <Button sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="contained" onClick={(e) => handleClickSuccess(e, 'email')}>완료</Button>
                        </Stack>
                    </>) :
                    (<TableData>
                        {userInfo.email}
                        <UpdateIcon onClick={(e) => handleClickUpdate(e, 'email')}>
                            <CreateIcon sx={{ color: '#6a4a96' }} fontSize='small' />
                        </UpdateIcon>
                    </TableData>)
                }
            </TableRow>
            <TableRow>
                <TableHeader>비밀번호</TableHeader>
                {userInfoEditing.isPWEditing ?
                    (<>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 }, }}>
                            <TextField sx={{ height: '45px' }} color="secondary" size='small' id="outlined-password-input" label="Password" type="password" autoComplete="current-password" />
                        </Box>
                        <Stack direction="row">
                            <Button sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="outlined" onClick={(e) => handleClickCancel(e, 'password')}>취소</Button>
                            <Button sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="contained" onClick={(e) => handleClickSuccess(e, 'password')}>완료</Button>
                        </Stack>
                    </>) :
                    (<TableData>
                        ********
                        <UpdateIcon onClick={(e) => handleClickUpdate(e, 'password')}>
                            <CreateIcon sx={{ color: '#6a4a96' }} fontSize='small' />
                        </UpdateIcon>
                    </TableData>)
                }
            </TableRow>
        </Table>
    )

}

export default UserInfo;

export const Table = styled.table`
    border-collapse:collapse;
    border-bottom:1.5px solid #C9CACC;
    border-top:1.5px solid #C9CACC;
    border-left:none;
    border-right:none;
    width:500px;
    margin-bottom:50px;
`

export const TableRow = styled.tr`

`

export const TableHeader = styled.th`
    padding:30px;
    border-top:0.5px solid #C9CACC;
    background-color:#fbf7ff;
    font-size:14px;
`

export const TableData = styled.td`
    padding:30px;
    border-top:0.5px solid #C9CACC;
    border-left:1.5px solid #C9CACC;
`

const UpdateIcon = styled.button`
    position:absolute;
    margin-top:-3px;
    margin-left:15px;
    cursor:pointer;
    background-color:white;
    border:none;
`

export const WarningMessage = styled.div`
    margin-top:10px;
    font-size:12px;
`