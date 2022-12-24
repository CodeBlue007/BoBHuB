import MainNavBar from './components/MainNavBar';
import Footer from '../../components/Footer';
import IntroSection from './components/IntroSection';
import styled from 'styled-components';
import SimpleSlider from './components/SliderSection';

const Content = styled.div`
  width: 100%;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainPage = () => {
  return (
    <Content>
      <MainNavBar />
      <IntroSection />
      <SimpleSlider />
      <Footer />
    </Content>
  );
};

export default MainPage;
