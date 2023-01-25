import React from 'react'
import { Link } from 'react-router-dom';

import { Toolbar } from '@mui/material';

import '../Marketplace.css';

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
