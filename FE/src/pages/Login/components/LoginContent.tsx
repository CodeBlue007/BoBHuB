import LoginForm from './LoginForm';

const LoginContent = () => {
  const onLoginSubmit = (loginForm: { email: string; password: string }) => {};
  return <LoginForm onLoginSubmit={onLoginSubmit} />;
};

export default LoginContent;
