import React from 'react'
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar } from '@mui/material'
import Logo from './logo.png';
import login from './kakao_login_medium.png'
import './Component.css';

const Nav = () => {

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static" color='inherit'>
        <Toolbar>
          <Link to="/">
            <img className="nav_logo" src = {Logo} alt = "logo" />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <a href="">
            <img className="kakao_login" src = {login} alt = "kakao login" />
          </a>
        </Toolbar>
    //   </AppBar>
    // </Box>
  )
}

export default Nav;
