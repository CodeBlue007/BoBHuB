import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import IntroSection from './components/IntroSection';
import styled from 'styled-components';
import SimpleSlider from './components/SliderSection';

const Content = styled.div`
  width: 100%;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const MainPage = () => {
  return (
    <Content>
      <NavBar />
      <IntroSection />
      <SimpleSlider />
      <Footer />
    </Content>
  );
};

export default MainPage;
