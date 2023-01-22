import React from 'react'
import { Toolbar } from '@mui/material';
import '../Marketplace.css';
import { Link } from 'react-router-dom';

export const Tabs = () => {
  return (
    <>
      <div className='tabs_line'/>
      <Toolbar>
        <Link to="/marketplace/upcoming">
          <button className='tabs_btn'>UPCOMING</button>
        </Link>
        <Link to="/marketplace/onsale">
          <button className='tabs_btn'>ON SALE</button>
        </Link>
      </Toolbar>
    </>
  )
}
