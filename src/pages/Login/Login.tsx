import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import LoginContent from './components/LoginContent';

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
