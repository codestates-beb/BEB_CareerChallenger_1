import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, AppBar, Toolbar } from "@mui/material";
import Logo from "./logo.png";
import login from "./kakao_login_medium.png";
import { UseContext } from "../User/UserContextProvider";
import axios from "axios";
import "./Component.css";

const loginHandler = () => {
  window.location.href =
    "https://kauth.kakao.com/oauth/authorize?client_id=408eb292ea89d448bfc9bc935126f27b&redirect_uri=http://localhost:5000/user/auth/kakao&response_type=code";
};

const Nav = () => {
<<<<<<< HEAD
  const { user, setUsers } = useContext(UseContext);
  console.log(user);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("login");
    if (name) {
      let date = new Date();
      date.setMinutes(date.getMinutes() + 10);
      axios
        .get("http://localhost:5000/user/userInfo", { withCredentials: true })
        .then((res) => {
          localStorage.setItem("expiresIn", date);
          setUsers(res.data);
        })
        .catch((err) => {
          console.log("쿠키가없는데 시도");
        });
    }
  }, []);

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static" color='inherit'>
    <Toolbar>
      <Link to="/">
        <img className="nav_logo" src={Logo} alt="logo" />
      </Link>
      <Box sx={{ flexGrow: 1 }} />
      <button type="button" onClick={loginHandler}>
        <img className="kakao_login" src={login} alt="kakao login" />
      </button>
    </Toolbar>
    //   </AppBar>
    // </Box>
  );
};
=======
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
>>>>>>> 9a4ddd21efa3be38896c82749a2844fbef5fea34

export default Nav;
