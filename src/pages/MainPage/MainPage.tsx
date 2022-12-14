import NavBar from '../../components/NavBar';
import IntroSection from './components/IntroSection';
import SliderSection from './components/SliderSection';
import Footer from '../../components/Footer';
import styled from 'styled-components';

const Content = styled.div`
  height: 300vh;
  width: 100vw:
  min-width: 1000px;
  display: flex;
  flex-direction: column;
`;

const MainPage = () => {
  return (
    <Content>
      <NavBar />
      <IntroSection />
      <SliderSection />
      <Footer />
    </Content>
  );
};

export default MainPage;
