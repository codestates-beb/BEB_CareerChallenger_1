import React from 'react'
import { Toolbar } from '@mui/material';
import '../Marketplace.css';
import { Link } from 'react-router-dom';

export const Tabs = () => {
  return (
    <>
      <Toolbar>
        <Link to="/marketplace/allconcert">
          <button className='nav_btn'>ALL</button>
        </Link>
        <Link to="/marketplace/onsale">
          <button className='nav_btn'>ON SALE</button>
        </Link>
      </Toolbar>
    </>
  )
}
