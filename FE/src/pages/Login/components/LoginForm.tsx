import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import loginThumbnail from '../../../assets/talk.jpg';
import { validateEmail, validatePassword } from '../../../util/validateLogin';

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: 15vh auto;

  & h1 {
    margin: 20px auto 30px auto;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-right: 100px;
  padding: 0px 0px 10px 0px;

  & h1 {
    margin: 20px auto;
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 2px;
  }

  & img {
    width: 35vw;
    border-radius: 2px;
    opacity: 80%;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  background-color: #f3f3f3;
  border-radius: 4px;

  height: 46vh;
  padding: 0px 20px 0px 20px;

  & input {
    font-size: 15px;
    width: 25vw;
    height: 4vh;
  }

  & div:nth-child(2),
  & div:nth-child(3) {
    margin: 10px auto;
  }

  & #menu- > div > ul {
    margin-top: 20px;
  }

  & button {
    margin: 20px auto;
    width: 26.5vw;
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

  & .goToRegister {
    font-size: 14px;
    margin-top: -5px;
    margin-right: 16.5vw;
  }
`;

type loginFormProps = {
  onLoginSubmit: (loginForm: { email: string; password: string }) => void;
};

const LoginForm = ({ onLoginSubmit }: loginFormProps) => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginForm;

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLoginSubmit(loginForm);
    // form 초기화
    setLoginForm({
      email: '',
      password: '',
    });
  };

  return (
    <LoginFormContainer onSubmit={handleLoginSubmit}>
      <ImgContainer>
        <h1>Welcome Back!</h1>
        <img src={loginThumbnail} alt="Bob-hub login thumbnail" />
      </ImgContainer>

      <BoxContainer>
        <h1>[로고 들어갈 자리]</h1>
        <TextField
          name="email"
          label="이메일"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={onTextFieldChange}
          error={!validateEmail(loginForm.email)}
          helperText={!validateEmail(loginForm.email) ? '이메일 형식이 올바르지 않습니다.' : ''}
        />

        <TextField
          type="password"
          name="password"
          label="비밀번호"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={onTextFieldChange}
          error={!validatePassword(loginForm.password)}
          helperText={
            !validatePassword(loginForm.password)
              ? '비밀번호는 8~20자리 영문·숫자 조합이어야 합니다.'
              : ''
          }
        />

        <Button variant="contained" type="submit">
          로그인
        </Button>
        <div className="goToRegister">
          아직 계정이 없으신가요? &nbsp;
          <Link to="/register">회원가입</Link>
        </div>
      </BoxContainer>
    </LoginFormContainer>
  );
};

export default LoginForm;
