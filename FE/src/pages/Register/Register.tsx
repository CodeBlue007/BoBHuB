import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import RegisterContent from './components/RegisterContent';
import Footer from '../../components/Footer';

const RegisterContainer = styled.section``;

const Register = () => {
  return (
    <RegisterContainer>
      <NavBar />
      <RegisterContent />
      <Footer />
    </RegisterContainer>
  );
};

export default Register;
