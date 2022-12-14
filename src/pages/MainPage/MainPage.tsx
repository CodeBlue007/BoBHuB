import NavBar from '../../components/NavBar';
import MainPageFooter from './components/MainPageFooter';
import IntroSection from './components/IntroSection';
import styled from 'styled-components';
import SimpleSlider from './components/SliderSection';

const Content = styled.div`
  height: 250vh;
  width: 100%;
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
      <MainPageFooter />
    </Content>
  );
};

export default MainPage;
