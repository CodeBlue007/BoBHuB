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

  & TextField {
    /* font-size: 15px; */
    margin: 10px auto;
    width: 40vw;
    height: 2vh;
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
`;

const trackNum = ['SW 3기', 'SW 4기', 'IoT 1기', 'AI 6기'];

const LoginForm = () => {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <LoginFormContainer onSubmit={submitHandler}>
      {/* <Box> */}
      <h1>Sign Up</h1>

      <TextField id="userName" label="이름" variant="standard" placeholder="이름을 입력해주세요." />

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
        id="standard-select-currency"
        select
        label="트랙/기수"
        defaultValue="EUR"
        helperText="트랙/기수를 선택해주세요."
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
      {/* </Box> */}
    </LoginFormContainer>
  );
};

export default LoginForm;
