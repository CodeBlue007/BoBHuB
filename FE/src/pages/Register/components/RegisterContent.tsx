import RegisterForm from './RegisterForm';

const RegisterContent = () => {
  const onRegSubmit = (regForm: {
    name: string;
    nickname: string;
    password: string;
    passwordCheck?: string;
    phone: string;
    email: string;
    confirmNum?: string;
    track: string;
    // generation: number;
    generation: string;
  }) => {
    delete regForm.passwordCheck;
    delete regForm.confirmNum;
  };
  return <RegisterForm onRegSubmit={onRegSubmit} />;
};

export default RegisterContent;
