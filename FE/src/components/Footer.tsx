import styled from 'styled-components';
import { Row, Col } from 'antd';

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 100vw;
  text-align: center;
  height: 15vh;
`;

const Footer = () => {
  return (
    <Wrapper>
      <Row
        justify="center"
        align="middle"
        style={{
          height: '50px',
          width: '100%',
          backgroundColor: 'white',
          borderTop: '0.5px solid black',
          textAlign: 'center',
          fontSize: '0.8em',
          marginTop: 'auto',
        }}>
        <Col>©SEJELMATRAMEN. ALL RIGHTS RESERVED</Col>
      </Row>
    </Wrapper>
  );
};

export default Footer;
