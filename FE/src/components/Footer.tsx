import styled from 'styled-components';
import { Row, Col } from 'antd';

const Wrapper = styled.footer`
  display: flex;
  width: 99vw;
  text-align: center;
  height: 5vh;
  margin: 0;
`;

const Footer = () => {
  return (
    <Wrapper>
      <Row
        justify="center"
        align="middle"
        style={{
          height: '50px',
          width: 'inherit',
          backgroundColor: 'white',
          borderTop: '0.5px solid black',
          textAlign: 'center',
          fontSize: '0.8em',
          marginTop: 'auto',
          boxSizing: 'border-box',
        }}>
        <Col>©SEJELMATRAMEN. ALL RIGHTS RESERVED</Col>
      </Row>
    </Wrapper>
  );
};

export default Footer;
