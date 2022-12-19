import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import LoginContent from './components/LoginContent';
import MainPageFooter from './../MainPage/components/MainPageFooter';

const LoginContainer = styled.section``;

const Login = () => {
  return (
    <LoginContainer>
      <NavBar />
      <LoginContent />
      <MainPageFooter />
    </LoginContainer>
  );
};

export default Login;
