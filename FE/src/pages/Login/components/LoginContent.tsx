import LoginForm from './LoginForm';
import axios from 'axios';

const LoginContent = () => {
  const onLoginSubmit = (loginForm: { email: string; password: string }) => {};
  return <LoginForm onLoginSubmit={onLoginSubmit} />;
};

export default LoginContent;
