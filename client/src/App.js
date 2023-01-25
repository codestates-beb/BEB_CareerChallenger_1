import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Nav from "./component/Nav";
import Footer from "./component/Footer";
import { Main } from "./main/Main";
import { Mypage } from "./mypage/Mypage";
import UserContextProvider from "./User/UserContextProvider";
import { Marketplace } from "./marketplace/Marketplace";
import { Emptypage } from "./component/Emptypage";
import { Detail } from "./detail/Detail";

function App() {
  const [concertinfo, setConcertinfo] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/nftpark/concertInfo', {
      withCredentials: true
    }).then((res) => {
      setConcertinfo(res.data.data);
      console.log(res.data.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <>
      <UserContextProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Main concertinfo={concertinfo}/>} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/detail/:id" element={<Detail concertinfo={concertinfo}/>} />
          <Route path="/marketplace/*" element={<Marketplace concertinfo={concertinfo}/>} />
          <Route path="*" element={<Emptypage />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </>
  );
}

export default App;
