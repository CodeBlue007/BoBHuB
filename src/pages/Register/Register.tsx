import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import RegisterContent from './components/RegisterContent';

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
