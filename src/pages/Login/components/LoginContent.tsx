import LoginForm from './LoginForm';
// import validateLogin from '../../../util/validateID';
import axios from 'axios';

const LoginContent = () => {
  const onLoginSubmit = (loginForm: { id: string; password: string }) => {
    // if (!validateLogin(loginForm)) return;
    // console.log('login validation success');
  };
  return <LoginForm onLoginSubmit={onLoginSubmit} />;
};

export default LoginContent;
