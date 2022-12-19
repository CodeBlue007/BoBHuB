import NavBar from '../../components/NavBar';
import MainPageFooter from './components/MainPageFooter';
import IntroSection from './components/IntroSection';
import styled from 'styled-components';
import SimpleSlider from './components/SliderSection';
import ChatApp from '../../components/ChatApp/ChatApp';

const Content = styled.div`
  height: 230vh;
  width: 100vw;
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
      <MainPageFooter />
      <ChatApp/>
    </Content>
  );
};

export default MainPage;
