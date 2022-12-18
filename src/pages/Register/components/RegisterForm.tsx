import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, Button, MenuItem } from '@mui/material';
import { regFormProps } from '../types/regType';
import { validateID, validatePassword } from '../../../util/validateLogin';
import {
  validateName,
  validateNickName,
  validatePWCheck,
  validatePhone,
  validateEmail,
  validateConfirmNum,
  validateTrack,
  validateGeneration,
} from '../../../util/validateRegister';

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

  background-color: #f3f3f3;
  border-radius: 4px;

  height: 115vh;
  padding: 0px 20px;

  margin-bottom: 80px;

  & input {
    font-size: 15px;
    width: 30vw;
  }

  & div:nth-child(2),
  & div:nth-child(3),
  & div:nth-child(4),
  & div:nth-child(5),
  & div:nth-child(6),
  & div:nth-child(7),
  & div:nth-child(8),
  & div:nth-child(9) {
    margin: 13px auto;
  }
  & #standard-select-track-label {
    margin-bottom: 10px;
  }

  & #standard-select-track {
    width: 28.5vw;
    border-radius: 4px;
  }

  & #menu- > div > ul {
    margin-top: 20px;
  }

  & button {
    margin: 20px auto;
    width: 30.5vw;
    height: 4vh;
    font-size: 17px;
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
    margin-right: 24vw;
  }
`;

const RegisterForm = ({ onRegSubmit }: regFormProps) => {
  // useState 방식
  const [regForm, setRegForm] = useState({
    name: '',
    id: '',
    nickName: '',
    password: '',
    passwordCheck: '',
    phone: '',
    email: '',
    confirmNum: '',
    track: '',
    generation: 0,
  });

  const {
    name,
    id,
    nickName,
    password,
    passwordCheck,
    phone,
    email,
    confirmNum,
    track,
    generation,
  } = regForm;

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegForm({
      ...regForm,
      [name]: value,
    });
  };

  const handleRegSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegSubmit(regForm);
    // form 초기화
    setRegForm({
      name: '',
      id: '',
      nickName: '',
      password: '',
      passwordCheck: '',
      phone: '',
      email: '',
      confirmNum: '',
      track: '',
      generation: 0,
    });
  };

  return (
    <RegisterFormContainer onSubmit={handleRegSubmit}>
      <h1>Sign Up</h1>
      <BoxContainer>
        <TextField
          name="name"
          label="이름"
          variant="standard"
          placeholder="이름을 입력해주세요 (한글 2~6글자)."
          value={name}
          onChange={onTextFieldChange}
          error={!validateName(regForm.name)}
          helperText={!validateName(regForm.name) ? '이름은 한글 2~6글자이어야 합니다.' : ''}
        />

        <TextField
          name="id"
          label="아이디"
          variant="standard"
          placeholder="아이디를 입력해주세요 (영문(대·소문자) 5~15글자)."
          value={id}
          onChange={onTextFieldChange}
          error={!validateID(regForm.id)}
          helperText={
            !validateID(regForm.id) ? '아이디는 영문(대·소문자) 5~15글자이어야 합니다.' : ''
          }
        />

        <TextField
          name="nickName"
          label="닉네임"
          variant="standard"
          placeholder="닉네임을 입력해주세요 (한글·영문(대·소문자) 5~10글자)."
          value={nickName}
          onChange={onTextFieldChange}
          error={!validateNickName(regForm.nickName)}
          helperText={
            !validateNickName(regForm.nickName)
              ? '닉네임은 한글·영문(대·소문자) 5~10글자이어야 합니다.'
              : ''
          }
        />

        <TextField
          type="password"
          name="password"
          label="비밀번호"
          variant="standard"
          placeholder="비밀번호를 입력해주세요 (8~20자리 영문·숫자 조합)."
          value={password}
          onChange={onTextFieldChange}
          error={!validatePassword(regForm.password)}
          helperText={
            !validatePassword(regForm.password)
              ? '비밀번호는 8~20자리 영문·숫자 조합이어야 합니다.'
              : ''
          }
        />

        <TextField
          type="password"
          name="passwordCheck"
          label="비밀번호 재입력"
          variant="standard"
          placeholder="비밀번호를 다시 입력해주세요."
          value={passwordCheck}
          onChange={onTextFieldChange}
          error={!validatePWCheck(regForm.password, regForm.passwordCheck)}
          helperText={
            !validatePWCheck(regForm.password, regForm.passwordCheck)
              ? '비밀번호가 불일치합니다.'
              : ''
          }
        />

        <TextField
          type="text"
          name="phone"
          label="휴대폰번호"
          variant="standard"
          placeholder="휴대폰번호를 입력해주세요 (' - ' 포함)."
          value={phone}
          onChange={onTextFieldChange}
          error={!validatePhone(regForm.phone)}
          helperText={!validatePhone(regForm.phone) ? '유효한 휴대폰번호 형식이 아닙니다.' : ''}
        />

        <TextField
          type="text"
          name="email"
          label="이메일"
          variant="standard"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={onTextFieldChange}
          error={!validateEmail(regForm.email)}
          helperText={!validateEmail(regForm.email) ? '유효한 이메일 형식이 아닙니다.' : ''}
        />

        <TextField
          type="text"
          name="confirmNum"
          label="인증번호"
          variant="standard"
          placeholder="이메일에 기재된 인증번호를 입력해주세요."
          value={confirmNum}
          onChange={onTextFieldChange}
          error={!validateConfirmNum(regForm.confirmNum)}
          helperText={
            !validateConfirmNum(regForm.confirmNum) ? '인증번호가 일치하지 않습니다.' : ''
          }
        />

        <TextField
          type="text"
          name="track"
          label="트랙"
          variant="standard"
          placeholder="소속된 엘리스 트랙명을 입력해주세요 (AI, IoT, SW)."
          value={track}
          onChange={onTextFieldChange}
          error={!validateTrack(regForm.track)}
          helperText={!validateTrack(regForm.track) ? '존재하는 트랙이 아닙니다.' : ''}
        />

        <TextField
          type="text"
          name="generation"
          label="기수"
          variant="standard"
          placeholder="소속 트랙의 기수(숫자)를 입력해주세요."
          value={generation}
          onChange={onTextFieldChange}
          error={!validateGeneration(regForm.track, regForm.generation)}
          helperText={
            !validateGeneration(regForm.track, regForm.generation)
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
          <Link to="/login">계정이 이미 있습니다.</Link>
        </div>
      </BoxContainer>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
