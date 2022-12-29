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
  validateEmailCode,
  validateTrack,
  validateGeneration,
} from '../../../util/validateRegister';
import * as API from '../../../api/API';
import { postEmail, postEmailCode } from '../Api/registerAPI';
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

  & .emailInputBtnContainer {
    width: 574px;
    height: 56px;
    margin-bottom: 10px;
  }

  & .emailCodeInputBtnContainer {
    width: 574px;
    height: 60px;
  }

  & .NicknameCheckBtn {
    height: 30px;
    border-width: 0.5px;
    margin-left: 500px;
    margin-top: -51px;
  }

  & .EmailSendBtn {
    height: 30px;
    width: 100px;
    border-width: 0.5px;
    margin-left: 475px;
    margin-top: -91px;
  }

  & .EmailCodeSendBtn {
    height: 30px;
    width: 50px;
    border-width: 0.5px;
    margin-left: 510px;
    margin-top: -91px;
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
    emailCode: '',
    password: '',
    passwordCheck: '',
    phone: '',
    track: '',
    generation: '',
  });

  const [emailForm, setEmailForm] = useState({
    email: '',
  });

  const { name, nickname, email, emailCode, password, passwordCheck, phone, track, generation } =
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

    // 이름 validation
    if (!validateName(regForm.name)) {
      alert('이름 형식이 올바르지 않습니다.');
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }

    // 닉네임 validation
    if (!validateNickName(regForm.nickname)) {
      alert('닉네임 형식이 올바르지 않습니다.');
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }

    // 이메일 validation
    if (!validateEmail(regForm.email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }

    // 인증코드 validation
    if (!validateEmailCode(regForm.emailCode)) {
      alert('인증코드 형식이 올바르지 않습니다.');
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }

    // 비밀번호 validation
    if (!validatePassword(regForm.password)) {
      alert('비밀번호 형식이 올바르지 않습니다.');
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }

    // 비밀번호 체크 validation
    if (!validatePWCheck(regForm.password, regForm.passwordCheck)) {
      alert('비밀번호가 일치하지 않습니다.');
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }

    // 휴대폰번호 validation
    if (!validatePhone(regForm.phone)) {
      alert('휴대폰번호 형식이 올바르지 않습니다.');
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }

    // 트랙 validation
    if (!validateTrack(regForm.track)) {
      alert('존재하는 트랙이 아닙니다.');
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }

    // 기수 validation
    if (!validateGeneration(regForm.track, regForm.generation)) {
      alert('현재 활동 중인 기수가 아닙니다.');
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }

    // 닉네임 중복체크
    const resNickname = await API.get(`/api/users/nicknames/${regForm.nickname}`);
    if (resNickname.message.substr(0, 1) === '같') {
      alert('이미 존재하는 닉네임입니다.');
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        emailCode: '',
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

      // 전화번호 중복체크
      if (!resRegisterForm) {
        // throw new Error(`${resRegisterForm.type}\n${resRegisterForm.reason}`);
        throw new Error('해당 전화번호로 가입한 내역이 존재합니다');
      } else {
        // form 초기화
        setRegForm({
          name: '',
          nickname: '',
          email: '',
          emailCode: '',
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
        emailCode: '',
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
        emailCode: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }

    const emailBody = {
      email: inputEmail,
    };

    // 중복 확인 후 이메일 인증
    const resEmailVerify = await postEmail(emailBody);

    if (!resEmailVerify) {
      alert(`${resEmailVerify.message}\n다시 시도해 주세요.`);
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }
    setEmailForm(emailBody);
    alert(`${resEmailVerify.message}`); // 인증코드를 발송했습니다. 1분 안에 입력해주세요.
  };

  const handleEmailCodeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const textField = (e.target as HTMLButtonElement).previousSibling;
    const div = textField?.childNodes[0];
    const input = div?.childNodes[1];
    const inputEmailCode = (input as HTMLInputElement).value;

    const emailCodeBody = {
      email: emailForm.email,
      code: inputEmailCode,
    };

    // 중복 확인 후 이메일 인증
    try {
      const resEmailCodeVerify = await postEmailCode(emailCodeBody);
      if (resEmailCodeVerify.message.substr(0, 6) === '인증 코드가') {
        // throw new Error(`${resEmailCodeVerify.message}`);
        alert(`${resEmailCodeVerify.message}`); // 인증 코드가 일치하지 않습니다.
        return;
      } else if (!resEmailCodeVerify) {
        throw new Error('인증 과정에 문제가 있습니다.\n다시 시도해 주세요.');
      } else {
        alert(`${resEmailCodeVerify.message}`); // 인증되었습니다.
      }
    } catch (err) {
      alert(err);
      // form 초기화
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }
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

        <div className="emailCodeInputBtnContainer">
          <TextField
            required
            type="text"
            name="emailCode"
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
            placeholder="인증코드"
            value={emailCode}
            onChange={onTextFieldChange}
            error={!validateEmailCode(regForm.emailCode) && regForm.emailCode !== ''}
            helperText={
              !validateEmailCode(regForm.emailCode) && regForm.emailCode !== ''
                ? '인증코드 형식이 올바르지 않습니다.'
                : ''
            }
          />
          <Button
            className="EmailCodeSendBtn"
            variant="contained"
            size="small"
            onClick={handleEmailCodeClick}>
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
              ? '비밀번호가 일치하지 않습니다.'
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
