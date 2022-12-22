import styled from 'styled-components';

const FooterBox = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 100vw;
  text-align: center;
  height: 5vh;
`;

const Footer = () => {
  return <FooterBox>©SEJELMATRAMEN. ALL RIGHTS RESERVED</FooterBox>;
};

export default Footer;
