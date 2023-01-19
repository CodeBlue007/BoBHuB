import styled from 'styled-components';
import { Row, Col } from 'antd';
import React from 'react';

const Wrapper = styled.footer`
  display: flex;
  width: 99vw;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* height: 5vh; */
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
          backgroundColor: 'white',
          width: 'inherit',
          borderTop: '0.5px solid #7a7a7a',
          // borderWidth:'100%',
          color: '#7a7a7a',
          textAlign: 'center',
          fontSize: '0.8em',
          // marginTop: 'auto',
          boxSizing: 'border-box',
        }}>
        <Col>©SEJELMATRAMEN. ALL RIGHTS RESERVED</Col>
      </Row>
    </Wrapper>
  );
};

export default React.memo(Footer);
