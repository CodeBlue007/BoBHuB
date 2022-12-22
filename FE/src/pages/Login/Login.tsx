import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import LoginContent from './components/LoginContent';
import Footer from '../../components/Footer';

const LoginContainer = styled.section``;

const Login = () => {
  return (
    <LoginContainer>
      <NavBar />
      <LoginContent />
      <Footer />
    </LoginContainer>
  );
};

export default Login;
