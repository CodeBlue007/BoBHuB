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

  height: 90vh;
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

const trackNum = ['SW 3기', 'SW 4기', 'IoT 1기', 'AI 6기'];

const LoginForm = () => {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <LoginFormContainer onSubmit={submitHandler}>
      <h1>Sign Up</h1>
      <BoxContainer>
        <TextField
          id="userName"
          label="이름"
          variant="standard"
          placeholder="이름을 입력해주세요."
        />

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

        <TextField
          type="password"
          id="userRePW"
          label="비밀번호 재입력"
          variant="standard"
          placeholder="비밀번호를 다시 입력해주세요."
        />

        <TextField
          type="text"
          id="userPhoneNum"
          label="휴대폰번호"
          variant="standard"
          placeholder="휴대폰번호를 입력해주세요."
        />

        <TextField
          type="text"
          id="userEmail"
          label="이메일"
          variant="standard"
          placeholder="이메일을 입력해주세요."
        />

        <TextField
          type="text"
          id="userNum"
          label="인증번호"
          variant="standard"
          placeholder="이메일에 기재된 인증번호를 입력해주세요."
        />

        <TextField
          id="standard-select-track"
          select
          label="트랙/기수"
          // defaultValue="EUR"
          // helperText="트랙/기수를 선택해주세요."
          variant="standard">
          {trackNum.map((elem) => (
            <MenuItem key={elem} value={elem}>
              {elem}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained">회원가입</Button>

        <a href="/login" className="loginLink">
          계정이 이미 있습니다.
        </a>
      </BoxContainer>
    </LoginFormContainer>
  );
};

export default LoginForm;
