import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Emptypage } from '../component/Emptypage';
import { Allconcert } from './Allconcert';
import { Tabs } from './component/Tabs';
import { Onsale } from './Onsale';

export const Marketplace = () => {
  return (
    <>
      <Tabs />
      <Routes>
        <Route path="/" element={<Allconcert />} />
        <Route path="/allconcert" element={<Allconcert />} />
        <Route path="/onsale" element={<Onsale />} /> 
        <Route path="*" element={<Emptypage />} /> 
      </Routes>
    </>
  )
}
