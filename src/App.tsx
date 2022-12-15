import { GlobalStyle } from './styles/GlobalStyle';
import Dashboard from './pages/Admin/components/Admin';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Login />
    </div>
  );
}

export default App;
