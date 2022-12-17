import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, Button, MenuItem } from '@mui/material';

const RegisterFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

  height: 90vh;
  padding: 0px 20px 0px 20px;

  margin-bottom: 80px;

  & input {
    font-size: 15px;
    width: 40vw;
    height: 3vh;
  }

  & div:nth-child(2),
  & div:nth-child(3),
  & div:nth-child(4),
  & div:nth-child(5),
  & div:nth-child(6),
  & div:nth-child(7),
  & div:nth-child(8),
  & div:nth-child(9) {
    margin: 10px auto;
  }

  & div:nth-child(8) div {
    padding-top: 10px;
  }

  & #standard-select-track {
    width: 38.5vw;
    /* padding-left: 10px; */
    border-radius: 4px;
    padding: 10px;
  }

  & #menu- > div > ul {
    margin-top: 20px;
  }

  & button {
    margin: 20px auto;
    width: 42vw;
    height: 4vh;
    font-size: 17px;
    color: #fff;
    background-color: #1976d2;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  & a {
    color: #999;
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }
`;

const BackToLogin = styled.div`
  margin-top: -5px;
  margin-right: 430px;
`;

const trackNum = ['SW 3기', 'SW 4기', 'IoT 1기', 'AI 6기'];

type regFormProps = {
  onRegSubmit: (regForm: {
    name: string;
    id: string;
    nickName: string;
    password: string;
    passwordCheck: string;
    phone: string;
    email: string;
    confirmNum: string;
  }) => void;
};

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
  });

  const { name, id, nickName, password, passwordCheck, phone, email, confirmNum } = regForm;

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
        />

        <TextField
          name="id"
          label="아이디"
          variant="standard"
          placeholder="아이디를 입력해주세요 (영문(대·소문자) 5~15글자)."
          value={id}
          onChange={onTextFieldChange}
        />

        <TextField
          name="nickName"
          label="닉네임"
          variant="standard"
          placeholder="닉네임을 입력해주세요 (한글·영문(대·소문자) 5~10글자)."
          value={nickName}
          onChange={onTextFieldChange}
        />

        <TextField
          type="password"
          name="password"
          label="비밀번호"
          variant="standard"
          placeholder="비밀번호를 입력해주세요 (8~20자리 영문·숫자 조합)."
          value={password}
          onChange={onTextFieldChange}
        />

        <TextField
          type="password"
          name="passwordCheck"
          label="비밀번호 재입력"
          variant="standard"
          placeholder="비밀번호를 다시 입력해주세요."
          value={passwordCheck}
          onChange={onTextFieldChange}
        />

        <TextField
          type="text"
          name="phone"
          label="휴대폰번호"
          variant="standard"
          placeholder="휴대폰번호를 입력해주세요 (' - ' 포함)."
          value={phone}
          onChange={onTextFieldChange}
        />

        <TextField
          type="text"
          name="email"
          label="이메일"
          variant="standard"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={onTextFieldChange}
        />

        <TextField
          type="text"
          name="confirmNum"
          label="인증번호"
          variant="standard"
          placeholder="이메일에 기재된 인증번호를 입력해주세요."
          value={confirmNum}
          onChange={onTextFieldChange}
        />

        <TextField
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
        </TextField>

        <Button variant="contained" type="submit">
          회원가입
        </Button>

        <BackToLogin>
          <Link to="/login">계정이 이미 있습니다.</Link>
        </BackToLogin>
      </BoxContainer>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
