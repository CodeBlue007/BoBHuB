const validateName = (name: string) => {
  const nameRegex = /^[ㄱ-ㅎ|가-힣]{2,6}$/;

  return nameRegex.test(name);
};

const validateNickName = (nickname: string) => {
  const nickNameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]{5,10}$/;

  return nickNameRegex.test(nickname);
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

const validateEmailCode = (emailCode: string) => {
  const emailCodeRegex = /^\d{5}$/;
  return emailCodeRegex.test(emailCode);
};

const validateTrack = (track: string) => {
  const trackArr = ['AI', 'IoT', 'SW'];
  return trackArr.includes(track);
};

const validateGeneration = (track: string, generation: string) => {
  if (track === 'AI') {
    return generation === '6';
  } else if (track === 'IoT') {
    return generation === '1';
  } else if (track === 'SW') {
    return generation === '3';
  }
};

export {
  validateName,
  validateNickName,
  validatePWCheck,
  validatePhone,
  validateEmail,
  validateEmailCode,
  validateTrack,
  validateGeneration,
};
