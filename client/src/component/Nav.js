import React from "react";
import { Link } from "react-router-dom";
import { Box, AppBar, Toolbar } from "@mui/material";
import Logo from "./logo.png";
import login from "./kakao_login_medium.png";
import "./Component.css";

const loginHandler = () => {
  window.location.href =
    "https://kauth.kakao.com/oauth/authorize?client_id=408eb292ea89d448bfc9bc935126f27b&redirect_uri=http://localhost:5000/user/auth/kakao&response_type=code";
};

const Nav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Link to="/">
            <img className="nav_logo" src={Logo} alt="logo" />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <button type="button" onClick={loginHandler}>
            <img className="kakao_login" src={login} alt="kakao login" />
          </button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
