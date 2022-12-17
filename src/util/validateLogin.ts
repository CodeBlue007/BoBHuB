const validateID = (id: string) => {
  const idRegex = /^[a-zA-Z]{5,15}$/;

  return idRegex.test(id);
};

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/;

  return passwordRegex.test(password);
};

export { validateID, validatePassword };
