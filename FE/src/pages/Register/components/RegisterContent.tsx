import RegisterForm from './RegisterForm';
import postRegisterData from '../Api/registerAPI';

const RegisterContent = () => {
  const onRegSubmit = (regForm: {
    name: string;
    nickName: string;
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

    // 회원가입 정보 post api
    // postRegisterData(regForm);
  };
  return <RegisterForm onRegSubmit={onRegSubmit} />;
};

export default RegisterContent;
