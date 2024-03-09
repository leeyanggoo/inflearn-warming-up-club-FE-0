import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";

const Layout = ({ setIsLogin }) => {
  return (
    <div>
      <Nav setIsLogin={setIsLogin} />
      <Outlet />
    </div>
  );
};

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("user") ? true : false
  );

  useEffect(() => {
    isLogin ? navigate("/") : navigate("/login");
  }, [isLogin]);

  return (
    <div className="text-white App bg-main">
      <Routes>
        {isLogin ? (
          <Route path="/" element={<Layout setIsLogin={setIsLogin} />}>
            <Route index element={<MainPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="search/:movieId" element={<DetailPage />} />
          </Route>
        ) : (
          <Route path="login" element={<LoginPage setIsLogin={setIsLogin} />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
