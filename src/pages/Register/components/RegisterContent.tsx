import RegisterForm from './RegisterForm';
import valiDateData from '../../../util/validateRegister';
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
  }) => {
    if (!valiDateData(regForm)) return;
    console.log('validation success');
  };
  return <RegisterForm onRegSubmit={onRegSubmit} />;
};

export default RegisterContent;
