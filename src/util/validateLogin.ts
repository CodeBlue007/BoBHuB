const validateLogin = (loginForm: { id: string; password: string }) => {
  const { id, password } = loginForm;
  console.log(loginForm);

  const idRegex = /^[a-zA-Z]{5,15}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/;

  if (!id) {
    alert('아이디를 입력해주세요.');
    return false;
  } else if (!password) {
    alert('비밀번호를 입력해주세요.');
    return false;
  } else if (!idRegex.test(id)) {
    alert('아이디는 영문(대·소문자) 5~15글자이어야 합니다.');
    return false;
  } else if (!passwordRegex.test(password)) {
    alert('비밀번호는 8~20자리 영문·숫자 조합이어야 합니다.');
    return false;
  } else return true;
};

export default validateLogin;
