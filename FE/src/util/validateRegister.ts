const validateName = (name: string) => {
  const nameRegex = /^[ㄱ-ㅎ|가-힣]{2,6}$/;

  return nameRegex.test(name);
};

const validateNickName = (nickName: string) => {
  const nickNameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]{5,10}$/;

  return nickNameRegex.test(nickName);
};

const validatePWCheck = (password: string, passwordCheck: string) => {
  return password === passwordCheck;
};

const validatePhone = (phone: string) => {
  const phoneNumRegex = /\d{2,3}-\d{3,4}-\d{3,4}/;

  return phoneNumRegex.test(phone);
};

const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const validateConfirmNum = (confirmNum: string) => {
  return true;
};

export {
  validateName,
  validateNickName,
  validatePWCheck,
  validatePhone,
  validateEmail,
  validateConfirmNum,
};
