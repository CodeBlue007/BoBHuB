import NavBar from '../../components/NavBar';
import IntroSection from './components/IntroSection';
import SliderSection from './components/SliderSection';
import styled from 'styled-components';

const Content = styled.div`
  height: 300vh;
  width: 100vw:
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const MainPage = () => {
  return (
    <Content>
      <NavBar />
      <IntroSection />
      <SliderSection />
    </Content>
  );
};

export default MainPage;
