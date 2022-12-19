import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import loginThumbnail from '../../../assets/talk.jpg';
import { validateID, validatePassword } from '../../../util/validateLogin';

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
    width: 28vw;
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
    width: 28.5vw;
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
    margin-right: 17vw;
  }
`;

type loginFormProps = {
  onLoginSubmit: (loginForm: { id: string; password: string }) => void;
};

const LoginForm = ({ onLoginSubmit }: loginFormProps) => {
  const [loginForm, setLoginForm] = useState({
    id: '',
    password: '',
  });

  const { id, password } = loginForm;

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
      id: '',
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
        <h1>Sign In</h1>
        <TextField
          name="id"
          label="아이디"
          variant="standard"
          placeholder="아이디를 입력해주세요."
          value={id}
          onChange={onTextFieldChange}
          error={!validateID(loginForm.id)}
          helperText={
            !validateID(loginForm.id) ? '아이디는 영문(대·소문자) 5~15글자이어야 합니다.' : ''
          }
        />

        <TextField
          type="password"
          name="password"
          label="비밀번호"
          variant="standard"
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
          계정이 없으신가요? &nbsp;
          <Link to="/register">회원가입 바로가기</Link>
        </div>
      </BoxContainer>
    </LoginFormContainer>
  );
};

export default LoginForm;
