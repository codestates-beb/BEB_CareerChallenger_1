import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Emptypage } from '../component/Emptypage';
import { Tabs } from './component/Tabs';
import { Onsale } from './Onsale';
import { Upcoming } from './Upcoming';

export const Marketplace = ({ concertinfo }) => {
  return (
    <>
      <Tabs />
      <Routes>
        <Route path="/" element={<Upcoming concertinfo={concertinfo}/>} />
        <Route path="/upcoming" element={<Upcoming concertinfo={concertinfo}/>} />
        <Route path="/onsale" element={<Onsale concertinfo={concertinfo}/>} /> 
        <Route path="*" element={<Emptypage />} /> 
      </Routes>
    </>
  )
}
