import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import RegisterContent from './components/RegisterContent';
import MainPageFooter from './../MainPage/components/MainPageFooter';

const RegisterContainer = styled.section``;

const Register = () => {
  return (
    <RegisterContainer>
      <NavBar />
      <RegisterContent />
      <MainPageFooter />
    </RegisterContainer>
  );
};

export default Register;
