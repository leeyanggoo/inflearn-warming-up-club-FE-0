import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';

import './App.css';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import Layout from './components/Layout';

function App() {
  useEffect(() => {
    document.body.className = 'bg-blue-50';
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='search/:pokemonId' element={<DetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
