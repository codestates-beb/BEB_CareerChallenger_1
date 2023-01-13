import React from 'react'
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar } from '@mui/material'
import Logo from './logo.png';
import login from './kakao_login_medium.png'
import './Component.css';

const Nav = () => {
  return (
    <Toolbar>
      <Link to="/">
        <img className="nav_logo" src = {Logo} alt = "logo" />
      </Link>
      <Box sx={{ flexGrow: 1 }} />
      <Link to="/detail">
        <button className='booking_btn'>DETAIL</button>
      </Link>
      <Link to="/mypage">
        <button className='booking_btn'>MYPAGE</button>
      </Link>
      <a href="">
        <img className="kakao_login" src = {login} alt = "kakao login" />
      </a>
    </Toolbar>
  )
}

export default Nav;
