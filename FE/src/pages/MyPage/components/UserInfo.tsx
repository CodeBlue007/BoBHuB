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
} from '../../../util/validateRegister';
import { validatePassword } from '../../../util/validateLogin';
import * as API from '../../../api/API';

interface UserProps {
  userInfo: UserInfoType;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>;
  isLoaded: React.MutableRefObject<boolean>;
}

const UserInfo = ({ userInfo, setUserInfo, isLoaded }: UserProps) => {
  const [userInfoEditing, setUserInfoEditing] = useState({
    isNameEditing: false,
    isNickEditing: false,
    isPhoneEditing: false,
    isPWEditing: false,
  });
  const [inputChange, setInputChange] = useState('');
  const [pwUpdate, setPWUpdate] = useState({ newPW: '', newPWCheck: '' });

  const handleClickUpdate = (e: React.MouseEvent<HTMLElement>, editTarget: string) => {
    e.preventDefault();
    setPWUpdate({ newPW: '', newPWCheck: '' });
    setInputChange('');
    switch (editTarget) {
      case 'name':
        setUserInfoEditing({
          isNameEditing: true,
          isNickEditing: false,
          isPhoneEditing: false,
          isPWEditing: false,
        });
        isLoaded.current = true;
        break;
      case 'nickname':
        setUserInfoEditing({
          isNameEditing: false,
          isNickEditing: true,
          isPhoneEditing: false,
          isPWEditing: false,
        });
        isLoaded.current = true;
        break;
      case 'phone':
        setUserInfoEditing({
          isNameEditing: false,
          isNickEditing: false,
          isPhoneEditing: true,
          isPWEditing: false,
        });
        isLoaded.current = true;
        break;
      case 'password':
        setUserInfoEditing({
          isNameEditing: false,
          isNickEditing: false,
          isPhoneEditing: false,
          isPWEditing: true,
        });
        isLoaded.current = true;
        break;
    }
  };

  const clickBtn_changeEditState = (editTarget: string) => {
    switch (editTarget) {
      case 'name':
        setUserInfoEditing({ ...userInfoEditing, isNameEditing: false });
        break;
      case 'nickname':
        setUserInfoEditing({ ...userInfoEditing, isNickEditing: false });
        break;
      case 'phone':
        setUserInfoEditing({ ...userInfoEditing, isPhoneEditing: false });
        break;
      case 'password':
        setUserInfoEditing({ ...userInfoEditing, isPWEditing: false });
    }
  };

  const nickDuplicationCheck = async () => {
    const res = await API.get(`api/users/nicknames/${inputChange}`);
    return res.message === '사용가능한 닉네임입니다.' ? true : false;
  };

  const emailDuplicationCheck = async () => {
    const res = await API.get(`api/users/emails/${inputChange}`);
    return res.message === '사용가능한 이메일입니다.' ? true : false;
  };

  const validInput = async (editSuccess: string) => {
    setUserInfo({ ...userInfo, [editSuccess]: inputChange });
    clickBtn_changeEditState(editSuccess);
  };

  const handleClickSuccess = async (e: React.MouseEvent<HTMLElement>, editSuccess: string) => {
    e.preventDefault();
    if (editSuccess === 'name') {
      if (!validateName(inputChange)) {
        alert('사용할 수 없는 이름입니다.');
        return;
      } else {
        validInput(editSuccess);
      }
    } else if (editSuccess === 'nickname') {
      if (!validateNickName(inputChange)) {
        alert('사용할 수 없는 닉네임입니다.');
        return;
      } else {
        const nickExist = await nickDuplicationCheck();
        if (!nickExist) {
          alert('이미 사용중인 닉네임입니다.');
          return;
        }
        validInput(editSuccess);
      }
    } else if (editSuccess === 'phone') {
      if (!validatePhone(inputChange)) {
        alert('유효하지 않은 휴대폰 번호 형식입니다.');
        return;
      } else {
        try {
          const res = await API.patch(`/api/users`, {
            phone: inputChange,
          });
          if (!res) {
            throw new Error('해당 전화로 가입한 다른 유저의 내역이 존재합니다.');
          }
        } catch (err) {
          alert(err);
          return;
        }
        validInput(editSuccess);
      }
    } else if (editSuccess === 'password') {
      if (inputChange === '') {
        alert('현재 비밀번호를 입력해주세요.');
        return;
      } else if (!validatePassword(pwUpdate.newPW)) {
        alert('올바른 비밀번호 형식이 아닙니다.');
        return;
      } else if (!validatePWCheck(pwUpdate.newPW, pwUpdate.newPWCheck)) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      } else {
        try {
          const res = await API.patch(`/api/users`, {
            password: inputChange,
            newPassword: pwUpdate.newPW,
          });
          if (!res) {
            throw new Error('기존 비밀번호가 일치하지 않습니다.');
          }
        } catch (err) {
          alert(err);
          return;
        }
        setInputChange('');
        setPWUpdate({ newPW: '', newPWCheck: '' });
        setUserInfo({ ...userInfo, password: '', newPassword: '' });
        clickBtn_changeEditState(editSuccess);
      }
    }
  };

  const handleClickCancel = (e: React.MouseEvent<HTMLElement>, editCancel: string) => {
    e.preventDefault();
    setInputChange('');
    clickBtn_changeEditState(editCancel);
    if (editCancel === 'password') setPWUpdate({ newPW: '', newPWCheck: '' });
  };

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputChange(e.target.value);
  };

  return (
    <Table>
      <TableRow>
        <TableHeader>이름</TableHeader>
        {userInfoEditing.isNameEditing ? (
          <ClickedTd>
            <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
              <TextField
                value={inputChange}
                onChange={handleUserInfoChange}
                sx={{ height: '45px', width: '315px' }}
                size="small"
                id="demo-helper-text-misaligned-no-helper"
                error={!validateName(inputChange)}
                helperText={
                  !validateName(inputChange)
                    ? '한글 2~6글자이어야 합니다.'
                    : '사용할 수 있는 이름입니다.'
                }
              />
            </Box>
            <Stack direction="row">
              <Button
                sx={{
                  fontWeight: 'bold',
                  margin: '15px 10px',
                  border: 'none',
                }}
                size="medium"
                variant="contained"
                color="error"
                onClick={(e) => handleClickCancel(e, 'name')}>
                취소
              </Button>
              <Button
                sx={{ fontWeight: 'bold', margin: '15px 0px' }}
                size="medium"
                variant="contained"
                onClick={(e) => handleClickSuccess(e, 'name')}>
                완료
              </Button>
            </Stack>
          </ClickedTd>
        ) : (
          <TableData>
            {userInfo.name}
            <UpdateIcon onClick={(e) => handleClickUpdate(e, 'name')}>
              <CreateIcon color="secondary" fontSize="small" />
            </UpdateIcon>
          </TableData>
        )}
      </TableRow>
      <TableRow>
        <TableHeader>트랙 / 기수</TableHeader>
        <TableData>
          {`${userInfo.track.toUpperCase()} ${userInfo.generation}기`}
          <WarningMessage>*최초 등록 후, 변경 불가합니다.</WarningMessage>
        </TableData>
      </TableRow>
      <TableRow>
        <TableHeader>닉네임</TableHeader>
        {userInfoEditing.isNickEditing ? (
          <ClickedTd>
            <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
              <TextField
                onChange={handleUserInfoChange}
                sx={{ height: '45px', width: '315px' }}
                size="small"
                id="demo-helper-text-misaligned-no-helper"
                error={!validateNickName(inputChange)}
                helperText={
                  !validateNickName(inputChange)
                    ? '한글·영문(대·소문자) 5~10글자이어야 합니다.'
                    : ''
                }
              />
            </Box>
            <Stack direction="row">
              <Button
                sx={{ fontWeight: 'bold', margin: '15px 10px' }}
                color="error"
                size="medium"
                variant="contained"
                onClick={(e) => handleClickCancel(e, 'nickname')}>
                취소
              </Button>
              <Button
                sx={{ fontWeight: 'bold', margin: '15px 0' }}
                size="medium"
                variant="contained"
                onClick={(e) => handleClickSuccess(e, 'nickname')}>
                완료
              </Button>
            </Stack>
          </ClickedTd>
        ) : (
          <TableData>
            {userInfo.nickname}
            <UpdateIcon onClick={(e) => handleClickUpdate(e, 'nickname')}>
              <CreateIcon color="secondary" fontSize="small" />
            </UpdateIcon>
          </TableData>
        )}
      </TableRow>
      <TableRow>
        <TableHeader>휴대폰 번호</TableHeader>
        {userInfoEditing.isPhoneEditing ? (
          <ClickedTd>
            <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
              <TextField
                onChange={handleUserInfoChange}
                sx={{ height: '45px', width: '315px' }}
                size="small"
                id="demo-helper-text-misaligned-no-helper"
                error={!validatePhone(inputChange)}
                helperText={!validatePhone(inputChange) ? '유효한 휴대폰번호 형식이 아닙니다.' : ''}
              />
            </Box>
            <Stack direction="row">
              <Button
                sx={{ fontWeight: 'bold', margin: '15px 10px' }}
                color="error"
                size="medium"
                variant="contained"
                onClick={(e) => handleClickCancel(e, 'phone')}>
                취소
              </Button>
              <Button
                sx={{ fontWeight: 'bold', margin: '15px 0' }}
                size="medium"
                variant="contained"
                onClick={(e) => handleClickSuccess(e, 'phone')}>
                완료
              </Button>
            </Stack>
          </ClickedTd>
        ) : (
          <TableData>
            {userInfo.phone}
            <UpdateIcon onClick={(e) => handleClickUpdate(e, 'phone')}>
              <CreateIcon color="secondary" fontSize="small" />
            </UpdateIcon>
          </TableData>
        )}
      </TableRow>
      <TableRow>
        <TableHeader>이메일</TableHeader>
        <TableData>
          {userInfo.email}
          <WarningMessage>*최초 등록 후, 변경 불가합니다.</WarningMessage>
        </TableData>
      </TableRow>
      <TableRow>
        <TableHeader>비밀번호</TableHeader>
        {userInfoEditing.isPWEditing ? (
          <ClickedTd>
            <Box>
              <TextField
                sx={{ margin: '0 0 20px 10px', height: '45px', width: '315px' }}
                size="small"
                type="password"
                id="outlined-helperText"
                helperText="현재 비밀번호를 입력해주세요."
                onChange={handleUserInfoChange}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <TextField
                sx={{ height: '45px', width: '315px' }}
                size="small"
                id="outlined-password-input"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPWUpdate({ ...pwUpdate, newPW: e.target.value })}
                error={!validatePassword(pwUpdate.newPW)}
                helperText={
                  !validatePassword(pwUpdate.newPW)
                    ? '4~20자리 영문·숫자 조합이어야 합니다.'
                    : '새로운 비밀번호 입력란입니다.'
                }
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                sx={{ height: '45px', margin: '20px 0 10px 10px', width: '315px' }}
                size="small"
                id="outlined-password-input"
                type="password"
                onChange={(e) => setPWUpdate({ ...pwUpdate, newPWCheck: e.target.value })}
                error={!validatePWCheck(pwUpdate.newPW, pwUpdate.newPWCheck)}
                helperText={
                  !validatePWCheck(pwUpdate.newPW, pwUpdate.newPWCheck)
                    ? '비밀번호가 불일치합니다.'
                    : '비밀번호가 일치합니다.'
                }
              />
            </Box>
            <Stack direction="row">
              <Button
                sx={{ fontWeight: 'bold', margin: '15px 10px' }}
                size="medium"
                variant="contained"
                color="error"
                onClick={(e) => handleClickCancel(e, 'password')}>
                취소
              </Button>
              <Button
                sx={{ fontWeight: 'bold', margin: '15px 0' }}
                size="medium"
                variant="contained"
                onClick={(e) => handleClickSuccess(e, 'password')}>
                완료
              </Button>
            </Stack>
          </ClickedTd>
        ) : (
          <TableData>
            ********
            <UpdateIcon onClick={(e) => handleClickUpdate(e, 'password')}>
              <CreateIcon color="secondary" fontSize="small" />
            </UpdateIcon>
          </TableData>
        )}
      </TableRow>
    </Table>
  );
};

export default UserInfo;

export const Table = styled.table`
  border-collapse: collapse;
  border-bottom: 1.5px solid ${(props) => props.theme.colors.lightGray};
  border-top: 1.5px solid ${(props) => props.theme.colors.lightGray};
  border-left: none;
  border-right: none;
  width: 700px;
  margin-bottom: 50px;
`;

export const TableRow = styled.tr``;

export const TableHeader = styled.th`
  padding: 25px;
  width: 120px;
  border-top: 0.5px solid ${(props) => props.theme.colors.lightGray};
  background-color: ${(props) => props.theme.colors.container};
  font-size: 14px;
`;

export const TableData = styled.td`
  padding: 25px;
  border-top: 0.5px solid ${(props) => props.theme.colors.lightGray};
  border-left: 1.5px solid ${(props) => props.theme.colors.lightGray};
`;

export const ClickedTd = styled.td`
  padding: 15px;
  border-top: 0.5px solid ${(props) => props.theme.colors.lightGray};
  border-left: 1.5px solid ${(props) => props.theme.colors.lightGray};
`;

const UpdateIcon = styled.button`
  position: absolute;
  margin-top: -3px;
  margin-left: 15px;
  cursor: pointer;
  background-color: white;
  border: none;
`;

export const WarningMessage = styled.div`
  margin-top: 10px;
  font-size: 12px;
`;
