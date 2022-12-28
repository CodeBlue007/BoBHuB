import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, Button, MenuItem, IconButton } from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MailLockOutlinedIcon from '@mui/icons-material/MailLockOutlined';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
import logo from '../../../assets/BoBHuB_logo.png';

const RegisterImgFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 10px auto 0px auto;

  & img {
    margin: 50px auto 10px auto;
    width: 160px;
  }
`;

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.colors.container};
  border-radius: 4px;

  height: 800px;
  padding: 5px 20px;

  margin-bottom: 80px;

  & input {
    font-size: 15px;
    width: 540px;
  }

  & div {
    margin: 10px 0;
  }

  & div p {
    margin: -7px 0;
  }

  /* & #standard-select-track-label {
    margin-bottom: 10px;
  }

  & #standard-select-track {
    width: 28.5vw;
    border-radius: 4px;
  } */

  /* & #menu- > div > ul {
    margin-top: 20px;
  } */

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

  & .pw input,
  .pwCheck input {
    width: 516px;
  }

  & div div div button {
    padding: 0;
    margin-right: -8px;
    width: 25px;
    height: 25px;
  }

  & .NicknameCheckBtn {
    height: 30px;
    border-width: 0.5px;
    margin-left: 500px;
    margin-top: -51px;
  }

  & .EmailSendBtn {
    height: 30px;
    border-width: 0.5px;
    margin-left: 500px;
    margin-top: -51px;
  }

  & .PhoneCheckBtn {
    height: 30px;
    border-width: 0.5px;
    margin-left: 500px;
    margin-top: -51px;
  }
`;

const RegisterButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & button {
    margin: 20px auto;
    width: 573px;
    height: 5vh;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.5px;
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
    margin-right: 0;
  }
`;

const RegisterForm = ({ onRegSubmit }: regFormProps) => {
  // useState 방식
  const [regForm, setRegForm] = useState({
    name: '',
    nickname: '',
    email: '',
    confirmNum: '',
    password: '',
    passwordCheck: '',
    phone: '',
    track: '',
    // generation: 0,
    generation: '',
  });

  const { name, nickname, email, confirmNum, password, passwordCheck, phone, track, generation } =
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

    const resNickname = await API.get(`/api/users/nicknames/${regForm.nickname}`);
    if (resNickname.message.substr(0, 1) === '같') {
      alert('이미 존재하는 닉네임입니다.');
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        confirmNum: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }

    try {
      const resRegisterForm = await API.post('/api/users/join', regForm);
      if (!resRegisterForm) {
        // throw new Error(`${resRegisterForm.type}\n${resRegisterForm.reason}`);
        throw new Error('해당 전화번호로 가입한 내역이 존재합니다');
      } else {
        // form 초기화
        setRegForm({
          name: '',
          nickname: '',
          email: '',
          confirmNum: '',
          password: '',
          passwordCheck: '',
          phone: '',
          track: '',
          generation: '',
        });
        // 회원가입 성공, 로그인페이지로 이동
        navigate('/login', { replace: true });
      }
    } catch (err) {
      alert(err);
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        confirmNum: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordCheck = () => setShowPasswordCheck((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleNicknameClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const textField = (e.target as HTMLButtonElement).previousSibling;
    const div = textField?.childNodes[0];
    const input = div?.childNodes[1];
    const inputNickname = (input as HTMLInputElement).value;
    const resNickname = await API.get(`/api/users/nicknames/${inputNickname}`);
    if (resNickname.message.substr(0, 1) === '같') {
      alert('이미 존재하는 닉네임입니다.');
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        confirmNum: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }
    alert('사용 가능한 닉네임입니다.');
  };

  const handleEmailClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const textField = (e.target as HTMLButtonElement).previousSibling;
    const div = textField?.childNodes[0];
    const input = div?.childNodes[1];
    const inputEmail = (input as HTMLInputElement).value;
    const resEmail = await API.get(`/api/users/emails/${inputEmail}`);
    if (resEmail.message.substr(0, 1) === '같') {
      alert('이미 가입된 이메일입니다.');
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        confirmNum: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }

    // 이메일 인증 - api 오류
    // const resEmailVerify = await API.get(`api/utils/${inputEmail}/send-code`);
    // // ${resEmailVerify.message}
    // if (!resEmailVerify) {
    //   alert('인증메일 전송 오류. 다시 시도해 주세요.');
    //   // form 초기화
    //   setRegForm({
    //     name: '',
    //     nickname: '',
    //     email: '',
    //     confirmNum: '',
    //     password: '',
    //     passwordCheck: '',
    //     phone: '',
    //     track: '',
    //     generation: '',
    //   });
    //   return;
    // }
    alert(`인증번호가 전송되었습니다.\n메일함에서 인증번호를 확인 후 1분 내로 입력해주세요.`);
  };

  const handleConfirmNumClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const textField = (e.target as HTMLButtonElement).previousSibling;
    const div = textField?.childNodes[0];
    const input = div?.childNodes[1];
    const inputConfirmNum = (input as HTMLInputElement).value;
    console.log(inputConfirmNum);
  };

  const handlePhoneClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const textField = (e.target as HTMLButtonElement).previousSibling;
    const div = textField?.childNodes[0];
    const input = div?.childNodes[1];
    const inputPhone = (input as HTMLInputElement).value;
    console.log(inputPhone);
  };

  return (
    <RegisterImgFormContainer onSubmit={handleRegSubmit}>
      <img src={logo} alt="logo" />
      <RegisterFormContainer>
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
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="이름"
          value={name}
          onChange={onTextFieldChange}
          error={!validateName(regForm.name) && regForm.name !== ''}
          helperText={
            !validateName(regForm.name) && regForm.name !== ''
              ? '이름은 한글 2~6자 사이여야 합니다.'
              : ''
          }
        />

        <TextField
          name="nickname"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeOutlinedIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="닉네임(중복 불가)"
          value={nickname}
          onChange={onTextFieldChange}
          error={!validateNickName(regForm.nickname) && regForm.nickname !== ''}
          helperText={
            !validateNickName(regForm.nickname) && regForm.nickname !== ''
              ? '닉네임은 한글·영문(대·소문자) 5~10자 사이여야 합니다.'
              : ''
          }
        />

        <div className="emailInputBtnContainer">
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
            inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
            sx={{
              input: {
                '&::placeholder': {
                  opacity: 0.8,
                },
              },
            }}
            placeholder="이메일"
            value={email}
            onChange={onTextFieldChange}
            error={!validateEmail(regForm.email) && regForm.email !== ''}
            helperText={
              !validateEmail(regForm.email) && regForm.email !== ''
                ? '유효한 이메일 형식이 아닙니다.'
                : ''
            }
          />
          <Button
            className="EmailSendBtn"
            variant="contained"
            size="small"
            onClick={handleEmailClick}>
            인증 메일 전송
          </Button>
        </div>

        <div className="confirmNumInputBtnContainer">
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
            inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
            sx={{
              input: {
                '&::placeholder': {
                  opacity: 0.8,
                },
              },
            }}
            placeholder="인증번호"
            value={confirmNum}
            onChange={onTextFieldChange}
            error={!validateConfirmNum(regForm.confirmNum) && regForm.confirmNum !== ''}
            helperText={
              !validateConfirmNum(regForm.confirmNum) && regForm.confirmNum !== ''
                ? '인증번호 형식이 부적절합니다.'
                : ''
            }
          />
          <Button
            className="EmailSendBtn"
            variant="contained"
            size="small"
            onClick={handleConfirmNumClick}>
            인증
          </Button>
        </div>

        <TextField
          className="pw"
          required
          type={showPassword ? 'text' : 'password'}
          name="password"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="비밀번호"
          value={password}
          onChange={onTextFieldChange}
          error={!validatePassword(regForm.password) && regForm.password !== ''}
          helperText={
            !validatePassword(regForm.password) && regForm.password !== ''
              ? '비밀번호는 4~20자 영문·숫자 조합이어야 합니다.'
              : ''
          }
        />

        <TextField
          className="pwCheck"
          required
          type={showPasswordCheck ? 'text' : 'password'}
          name="passwordCheck"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle passwordCheck visibility"
                  onClick={handleClickShowPasswordCheck}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="비밀번호 확인"
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
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="휴대폰번호(중복 불가)"
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
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="엘리스 트랙명(AI, IoT, SW)."
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
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="엘리스 기수(숫자만)"
          value={generation}
          onChange={onTextFieldChange}
          error={
            !validateGeneration(regForm.track, regForm.generation) && regForm.generation !== ''
          }
          helperText={
            !validateGeneration(regForm.track, regForm.generation) && regForm.generation !== ''
              ? '현재 활동 중인 기수가 아닙니다.'
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

        <RegisterButtonContainer>
          <Button variant="contained" type="submit" sx={{ backgroundColor: '#E59A59' }}>
            회원가입
          </Button>

          <div className="backToLogin">
            이미 계정이 있나요? &nbsp;
            <Link to="/login">로그인</Link>
          </div>
        </RegisterButtonContainer>
      </RegisterFormContainer>
    </RegisterImgFormContainer>
  );
};

export default RegisterForm;
