import validateEmail from './validateEmail';

const valiDateData = (regForm: {
  name: string;
  id: string;
  nickName: string;
  password: string;
  passwordCheck: string;
  phone: string;
  email: string;
  confirmNum: string;
}) => {
  const { name, id, nickName, password, passwordCheck, phone, email, confirmNum } = regForm;
  console.log(regForm);

  const nameRegex = /^[ㄱ-ㅎ|가-힣]{2,6}$/;
  const idRegex = /^[a-zA-Z]{5,15}$/;
  const nickNameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]{5,10}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/;
  const phoneNumRegex = /\d{2,3}-\d{3,4}-\d{3,4}/;

  if (!name) {
    alert('이름을 입력해주세요.');
    return false;
  } else if (!id) {
    alert('아이디를 입력해주세요.');
    return false;
  } else if (!nickName) {
    alert('닉네임을 입력해주세요.');
    return false;
  } else if (!password) {
    alert('비밀번호를 입력해주세요.');
    return false;
  } else if (!passwordCheck) {
    alert('비밀번호를 한번 더 입력해주세요.');
    return false;
  } else if (!phone) {
    alert('연락처를 입력해주세요.');
    return false;
  } else if (!email) {
    alert('이메일을 입력해주세요.');
    return false;
  } else if (!confirmNum) {
    alert('인증번호를 입력해주세요.');
    return false;
  } else if (!nameRegex.test(name)) {
    alert('이름은 한글 2~6글자이어야 합니다.');
    return false;
  } else if (!idRegex.test(id)) {
    alert('아이디는 영문(대·소문자) 5~15글자이어야 합니다.');
    return false;
  } else if (!nickNameRegex.test(nickName)) {
    alert('닉네임은 한글·영문(대·소문자) 5~10글자이어야 합니다.');
    return false;
  } else if (!passwordRegex.test(password)) {
    alert('비밀번호는 8~20자리 영문·숫자 조합이어야 합니다.');
    return false;
  } else if (!phoneNumRegex.test(phone)) {
    alert('유효한 휴대폰번호 형식이 아닙니다');
    return false;
  } else if (!validateEmail(email)) {
    alert('유효한 이메일 형식이 아닙니다.');
    return false;
  } else if (password !== passwordCheck) {
    alert('비밀번호가 불일치합니다.');
    return false;
  } else return true;
};

export default valiDateData;
