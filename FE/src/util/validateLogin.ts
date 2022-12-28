// 안 쓰일 예정 (∵ 이메일로 로그인)
const validateID = (id: string) => {
  const idRegex = /^[a-zA-Z]{5,15}$/;

  return idRegex.test(id);
};

const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,20}$/;

  return passwordRegex.test(password);
};

export { validateID, validateEmail, validatePassword };
