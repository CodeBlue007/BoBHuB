import RegisterForm from './RegisterForm';
import axios from 'axios';

const RegisterContent = () => {
  const onRegSubmit = (regForm: {
    name: string;
    id: string;
    nickName: string;
    password: string;
    passwordCheck: string;
    phone: string;
    email: string;
    confirmNum: string;
  }) => {};
  return <RegisterForm onRegSubmit={onRegSubmit} />;
};

export default RegisterContent;
