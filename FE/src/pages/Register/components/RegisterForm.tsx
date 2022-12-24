import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, Button, MenuItem } from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MailLockOutlinedIcon from '@mui/icons-material/MailLockOutlined';
import KeyIcon from '@mui/icons-material/Key';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import { regFormProps } from '../types/regType';
import { validateEmail, validatePassword } from '../../../util/validateLogin';
import {
  validateName,
  validateNickName,
  validatePWCheck,
  validatePhone,
  validateConfirmNum,
  validateTrack,
  validateGeneration,
} from '../../../util/validateRegister';
import * as API from '../../../api/API';

const RegisterFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 2vh auto 3vh auto;

  & h1 {
    margin: 50px auto 30px auto;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.colors.container};
  border-radius: 4px;

  height: 85vh;
  padding: 0px 20px;

  margin-bottom: 80px;

  & input {
    font-size: 15px;
    width: 28vw;
  }

  & div {
    margin: 10px 0px;
  }

  /* & #standard-select-track-label {
    margin-bottom: 10px;
  }

  & #standard-select-track {
    width: 28.5vw;
    border-radius: 4px;
  } */

  & #menu- > div > ul {
    margin-top: 20px;
  }

  & div div div {
    margin-right: 10px;
  }

  & div div input {
    font-size: 18px;
    color: #3a3b3c;
  }

  & div div input::placeholder {
    font-size: 18px;
    color: #3a3b3c;
  }

  & button {
    margin: 20px auto;
    width: 29.7vw;
    height: 5vh;
    font-size: 20px;
    font-weight: 600;
    border: none;
  }

  & a {
    color: #999;
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }

  & .backToLogin {
    font-size: 14px;
    margin-top: -5px;
    margin-right: 21.5vw;
  }
`;

const RegisterForm = ({ onRegSubmit }: regFormProps) => {
  // useState 방식
  const [regForm, setRegForm] = useState({
    name: '',
    nickName: '',
    email: '',
    confirmNum: '',
    password: '',
    passwordCheck: '',
    phone: '',
    track: '',
    // generation: 0,
    generation: '',
  });

  const { name, nickName, email, confirmNum, password, passwordCheck, phone, track, generation } =
    regForm;

  const navigate = useNavigate();

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegForm({
      ...regForm,
      [name]: value,
    });
  };

  const handleRegSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onRegSubmit(regForm);
    const res = await API.post('/api/users/join', regForm);

    // form 초기화
    setRegForm({
      name: '',
      nickName: '',
      email: '',
      confirmNum: '',
      password: '',
      passwordCheck: '',
      phone: '',
      track: '',
      // generation: 0,
      generation: '',
    });

    navigate('/login', { replace: true });
  };

  return (
    <RegisterFormContainer onSubmit={handleRegSubmit}>
      <h1>[로고 들어갈 자리]</h1>
      <BoxContainer>
        <TextField
          name="name"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="이름을 입력해주세요 (한글 2~6글자)."
          value={name}
          onChange={onTextFieldChange}
          error={!validateName(regForm.name) && regForm.name !== ''}
          helperText={
            !validateName(regForm.name) && regForm.name !== ''
              ? '이름은 한글 2~6글자이어야 합니다.'
              : ''
          }
        />

        <TextField
          name="nickName"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="닉네임을 입력해주세요 (한글·영문(대·소문자) 5~10글자)."
          value={nickName}
          onChange={onTextFieldChange}
          error={!validateNickName(regForm.nickName) && regForm.nickName !== ''}
          helperText={
            !validateNickName(regForm.nickName) && regForm.nickName !== ''
              ? '닉네임은 한글·영문(대·소문자) 5~10글자이어야 합니다.'
              : ''
          }
        />

        <TextField
          required
          type="text"
          name="email"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={onTextFieldChange}
          error={!validateEmail(regForm.email) && regForm.email !== ''}
          helperText={
            !validateEmail(regForm.email) && regForm.email !== ''
              ? '유효한 이메일 형식이 아닙니다.'
              : ''
          }
        />

        <TextField
          required
          type="text"
          name="confirmNum"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailLockOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="발송된 이메일에 기재된 인증번호를 입력해주세요."
          value={confirmNum}
          onChange={onTextFieldChange}
          error={!validateConfirmNum(regForm.confirmNum) && regForm.confirmNum !== ''}
          helperText={
            !validateConfirmNum(regForm.confirmNum) && regForm.confirmNum !== ''
              ? '인증번호가 일치하지 않습니다.'
              : ''
          }
        />

        <TextField
          required
          // type={showPassword ? 'text' : 'password'}
          type="password"
          name="password"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),

            // endAdornment: (
            //   <InputAdornment position="end">
            //     <IconButton
            //       aria-label="toggle password visibility"
            //       onClick={handleClickShowPassword}
            //       onMouseDown={handleMouseDownPassword}
            //       edge="end"
            //     >
            //     {showPassword ? <VisibilityOff /> : <Visibility />}
            //     </IconButton>
            //   </InputAdornment>
            // )
          }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="비밀번호를 입력해주세요 (8~20자리 영문·숫자 조합)."
          value={password}
          onChange={onTextFieldChange}
          error={!validatePassword(regForm.password) && regForm.password !== ''}
          helperText={
            !validatePassword(regForm.password) && regForm.password !== ''
              ? '비밀번호는 8~20자리 영문·숫자 조합이어야 합니다.'
              : ''
          }
        />

        <TextField
          required
          type="password"
          name="passwordCheck"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="비밀번호를 다시 입력해주세요."
          value={passwordCheck}
          onChange={onTextFieldChange}
          error={
            !validatePWCheck(regForm.password, regForm.passwordCheck) &&
            regForm.passwordCheck !== ''
          }
          helperText={
            !validatePWCheck(regForm.password, regForm.passwordCheck) &&
            regForm.passwordCheck !== ''
              ? '비밀번호가 불일치합니다.'
              : ''
          }
        />

        <TextField
          type="text"
          name="phone"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CallOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="휴대폰번호를 입력해주세요 (' - ' 포함)."
          value={phone}
          onChange={onTextFieldChange}
          error={!validatePhone(regForm.phone) && regForm.phone !== ''}
          helperText={
            !validatePhone(regForm.phone) && regForm.phone !== ''
              ? '유효한 휴대폰번호 형식이 아닙니다.'
              : ''
          }
        />

        <TextField
          type="text"
          name="track"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LaptopMacOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="소속된 엘리스 트랙명을 입력해주세요 (AI, IoT, SW)."
          value={track}
          onChange={onTextFieldChange}
          error={!validateTrack(regForm.track) && regForm.track !== ''}
          helperText={
            !validateTrack(regForm.track) && regForm.track !== '' ? '존재하는 트랙이 아닙니다.' : ''
          }
        />

        <TextField
          type="text"
          name="generation"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <NumbersOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="소속 트랙의 기수(숫자)를 입력해주세요."
          value={generation}
          onChange={onTextFieldChange}
          error={
            !validateGeneration(regForm.track, regForm.generation) && regForm.generation !== ''
          }
          helperText={
            !validateGeneration(regForm.track, regForm.generation) && regForm.generation !== ''
              ? '현재 활성화된 기수가 아닙니다.'
              : ''
          }
        />
        {/* <TextField
          id="standard-select-track"
          select
          label="트랙/기수"
          defaultValue=""
          // helperText="트랙/기수를 선택해주세요."
          variant="standard">
          {trackNum.map((elem) => (
            <MenuItem key={elem} value={elem}>
              {elem}
            </MenuItem>
          ))}
        </TextField> */}

        <Button variant="contained" type="submit">
          회원가입
        </Button>

        <div className="backToLogin">
          이미 계정이 있나요? &nbsp;
          <Link to="/login">로그인</Link>
        </div>
      </BoxContainer>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
