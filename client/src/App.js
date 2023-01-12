import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './component/Nav';
import Footer from './component/Footer';
import { Main } from './main/Main';
import { Mypage } from './mypage/Mypage';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
