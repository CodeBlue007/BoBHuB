import styled from 'styled-components';
import { TextField, Button, MenuItem, Box } from '@mui/material';

const LoginFormContainer = styled.form`
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

  height: 30vh;
  padding: 0px 20px 50px 20px;

  margin-bottom: 80px;

  & input {
    font-size: 15px;
    width: 40vw;
    height: 4vh;
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

const LoginForm = () => {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <LoginFormContainer onSubmit={submitHandler}>
      <h1>Sign In</h1>
      <BoxContainer>
        <TextField
          id="userID"
          label="아이디"
          variant="standard"
          placeholder="아이디를 입력해주세요."
        />

        <TextField
          type="password"
          id="userPW"
          label="비밀번호"
          variant="standard"
          placeholder="비밀번호를 입력해주세요."
        />

        <Button variant="contained">로그인</Button>

        <a href="/register" className="registerLink">
          계정이 없습니다.
        </a>
      </BoxContainer>
    </LoginFormContainer>
  );
};

export default LoginForm;
