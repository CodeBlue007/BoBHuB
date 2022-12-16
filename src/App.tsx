import { GlobalStyle } from './styles/GlobalStyle';
import Dashboard from './pages/Admin/components/Admin';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import FoodDetail from './pages/foodDetail/FoodDetail';

function App() {
  return (
    <div>
      <GlobalStyle />
      <FoodDetail />
    </div>
  );
  }

export default App;
