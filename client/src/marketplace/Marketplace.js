import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Emptypage } from '../component/Emptypage';
import { Allconcert } from './Allconcert';
import { Tabs } from './component/Tabs';
import { Onsale } from './Onsale';
import { Upcoming } from './Upcoming';

export const Marketplace = () => {
  return (
    <>
      <Tabs />
      <Routes>
        <Route path="/" element={<Upcoming />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/allconcert" element={<Allconcert />} />
        <Route path="/onsale" element={<Onsale />} /> 
        <Route path="*" element={<Emptypage />} /> 
      </Routes>
    </>
  )
}
