import React, { useState } from 'react';
import styled from 'styled-components';
import CreateIcon from '@mui/icons-material/Create';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { UserInfoType } from '../MyPage';
import {
    validateName,
    validateNickName,
    validatePWCheck,
    validatePhone,
    validateEmail,
    validateConfirmNum,
} from '../../../util/validateRegister';
import { validatePassword } from '../../../util/validateLogin';
import * as API from '../../FoodList/API';

interface UserType {
    userInfo: UserInfoType;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>;
}

const UserInfo = ({ userInfo, setUserInfo }: UserType) => {
    const [userInfoEditing, setUserInfoEditing] = useState({ isNameEditing: false, isNickEditing: false, isPhoneEditing: false, isEmailEditing: false, isPWEditing: false });
    const [inputChange, setInputChange] = useState('');
    const handleClickUpdate = (e: React.MouseEvent<HTMLElement>, editTarget: string) => {
        e.preventDefault();
        setInputChange('');
        switch (editTarget) {
            case 'name':
                setUserInfoEditing({ isNameEditing: true, isNickEditing: false, isPhoneEditing: false, isEmailEditing: false, isPWEditing: false });
                break;
            case 'nickName':
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
            case 'nickName':
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

    const nickDuplicationCheck = async () => {
        const res = await API.get(`http://localhost:4000/msg`);
        return (res.message === '같은 닉네임이 있습니다.') ? true : false;
    }

    const validInput = (editSuccess: string) => {
        //성공api post
        clickBtn_changeEditState(editSuccess);
        setUserInfo({ ...userInfo, [editSuccess]: inputChange });
        setInputChange('');
    }

    const handleClickSuccess = async (e: React.MouseEvent<HTMLElement>, editSuccess: string) => {
        e.preventDefault();
        if (editSuccess === 'name') {
            if (!validateName(inputChange)) {
                alert('사용할 수 없는 이름입니다.');
                return;
            } else {
                validInput(editSuccess);
            }
        } else if (editSuccess === 'nickName') {
            if (!validateNickName(inputChange)) {
                alert('사용할 수 없는 닉네임입니다.');
                return;
            } else if (await nickDuplicationCheck()) {
                alert('이미 사용중인 닉네임입니다.');
                return;
            } else {
                validInput(editSuccess);
            }
        } else if (editSuccess === 'phone') {
            if (!validatePhone(inputChange)) {
                alert('유효하지 않은 휴대폰 번호 형식입니다.');
                return;
            } else {
                validInput(editSuccess);
            }
        } else if (editSuccess === 'email') {
            if (!validateEmail(inputChange)) {
                alert('유효하지 않은 이메일 형식입니다.');
                return;
            } else {
                validInput(editSuccess);
            }
        }

    }

    const handleClickCancel = (e: React.MouseEvent<HTMLElement>, editCancel: string) => {
        e.preventDefault();
        clickBtn_changeEditState(editCancel);
        setInputChange('');
    }

    const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputChange(e.target.value);
    }

    return (
        <Table>
            <TableRow>
                <TableHeader>이름</TableHeader>
                {userInfoEditing.isNameEditing ?
                    (<>
                        <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 }, }}>
                            <TextField
                                value={inputChange}
                                onChange={handleUserInfoChange}
                                sx={{ height: '45px' }}
                                color="secondary"
                                size='small'
                                id="demo-helper-text-misaligned-no-helper"
                                label="Name"
                                error={!validateName(inputChange)}
                                helperText={!validateName(inputChange) ? '이름은 한글 2~6글자이어야 합니다.' : '사용할 수 있는 이름입니다.'}
                            />
                        </Box>
                        <Stack direction="row">
                            <Button sx={{ fontWeight: 'bold', margin: '15px 10px' }} color="secondary" size="medium" variant="outlined" onClick={(e) => handleClickCancel(e, 'name')}>취소</Button>
                            <Button sx={{ fontWeight: 'bold', margin: '15px 0px' }} color="secondary" size="medium" variant="contained" onClick={(e) => handleClickSuccess(e, 'name')}>완료</Button>
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
                            <TextField
                                onChange={handleUserInfoChange}
                                sx={{ height: '45px' }}
                                color="secondary"
                                size='small'
                                id="demo-helper-text-misaligned-no-helper"
                                label="Nickname"
                                error={!validateNickName(inputChange)}
                                helperText={
                                    !validateNickName(inputChange)
                                        ? '닉네임은 한글·영문(대·소문자) 5~10글자이어야 합니다.'
                                        : ''
                                }
                            />
                        </Box>
                        <Stack direction="row">
                            <Button sx={{ fontWeight: 'bold', margin: '15px 10px', }} color="secondary" size="medium" variant="outlined" onClick={(e) => handleClickCancel(e, 'nickName')}>취소</Button>
                            <Button sx={{ fontWeight: 'bold', margin: '15px 0' }} color="secondary" size="medium" variant="contained" onClick={(e) => handleClickSuccess(e, 'nickName')}>완료</Button>
                        </Stack>
                    </>) :
                    (<TableData>
                        {userInfo.nickName}
                        <UpdateIcon onClick={(e) => handleClickUpdate(e, 'nickName')}>
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
                            <TextField
                                onChange={handleUserInfoChange}
                                sx={{ height: '45px' }}
                                color="secondary"
                                size='small'
                                id="demo-helper-text-misaligned-no-helper"
                                label="Phone"
                                error={!validatePhone(inputChange)}
                                helperText={!validatePhone(inputChange) ? '유효한 휴대폰번호 형식이 아닙니다.' : ''}
                            />
                        </Box>
                        <Stack direction="row">
                            <Button sx={{ fontWeight: 'bold', margin: '15px 10px' }} color="secondary" size="medium" variant="outlined" onClick={(e) => handleClickCancel(e, 'phone')}>취소</Button>
                            <Button sx={{ fontWeight: 'bold', margin: '15px 0' }} color="secondary" size="medium" variant="contained" onClick={(e) => handleClickSuccess(e, 'phone')}>완료</Button>
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
                            <TextField
                                onChange={handleUserInfoChange}
                                sx={{ height: '45px' }}
                                color="secondary"
                                size='small'
                                id="demo-helper-text-misaligned-no-helper"
                                label="Email"
                                error={!validateEmail(inputChange)}
                                helperText={!validateEmail(inputChange) ? '유효한 이메일 형식이 아닙니다.' : ''}
                            />
                        </Box>
                        <Stack direction="row">
                            <Button sx={{ fontWeight: 'bold', margin: '15px 10px' }} color="secondary" size="medium" variant="outlined" onClick={(e) => handleClickCancel(e, 'email')}>취소</Button>
                            <Button sx={{ fontWeight: 'bold', margin: '15px 0' }} color="secondary" size="medium" variant="contained" onClick={(e) => handleClickSuccess(e, 'email')}>완료</Button>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 }, }}>
                            <TextField
                                sx={{ height: '45px' }}
                                color="secondary" size='small'
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleUserInfoChange}
                                error={!validatePassword(inputChange)}
                                helperText={
                                    !validatePassword(inputChange)
                                        ? '비밀번호는 8~20자리 영문·숫자 조합이어야 합니다.'
                                        : ''
                                }
                            />
                        </Box>
                        <Stack direction="row">
                            <Button sx={{ fontWeight: 'bold', margin: '15px 10px' }} color="secondary" size="medium" variant="outlined" onClick={(e) => handleClickCancel(e, 'password')}>취소</Button>
                            <Button sx={{ fontWeight: 'bold', margin: '15px 0' }} color="secondary" size="medium" variant="contained" onClick={(e) => handleClickSuccess(e, 'password')}>완료</Button>
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