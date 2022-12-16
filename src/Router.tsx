import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin/components/Admin';
import FoodDetail from './pages/FoodDetail/FoodDetail';
import FoodList from './pages/FoodList/FoodList';
import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/MainPage';
import MyPage from './pages/MyPage/MyPage';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';


const Router = () => {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/foodList" element={<FoodList/>} />
      <Route path="/foodList/:id" element={<FoodDetail/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/mypage" element={<MyPage/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  )
};

export default Router;
