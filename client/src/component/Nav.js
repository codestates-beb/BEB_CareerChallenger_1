import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Box, Toolbar, Avatar } from "@mui/material";

import Logo from "./logo.png";
import login from "./kakao_login_medium.png";
import { UseContext } from "../User/UserContextProvider";
import "./Component.css";

const loginHandler = () => {
  window.location.href =
    "https://kauth.kakao.com/oauth/authorize?client_id=408eb292ea89d448bfc9bc935126f27b&redirect_uri=http://localhost:5000/user/auth/kakao&response_type=code";
};

const Nav = () => {
  const { user, setUsers } = useContext(UseContext);

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
          setTimeout(() => {
            setUsers();
          }, 600000);
        })
        .catch((err) => {
          console.log("쿠키가없는데 시도");
        });
    }
    const time = new Date();
    if (!user.id && time < localStorage.getItem("expiresIn")) {
      axios
        .get("http://localhost:5000/user/userInfo", { withCredentials: true })
        .then((res) => {
          setUsers(res.data);
          setTimeout(() => {
            setUsers();
          }, time - localStorage.getItem("expiresIn"));
        })
        .catch((err) => {
          console.log("쿠키가없는데 시도");
        });
    }
  }, []);

  const LoggedIn = () => {
    return (
      <>
        <Link to="/mypage">
          <button className='nav_btn'>예약확인/취소</button>
        </Link>
        <Link to="/marketplace">
          <button className='nav_btn'>MARKETPLACE</button>
        </Link>
        <Link to="/mypage">
          <Avatar
          alt="kakao img"
          src={user.profile_image}
          sx={{ width: 56, height: 56, m:1 }}
          />
        </Link>
      </>
    )
  }

  const Logout = () => {
    return (
      <>
        <Link to="/marketplace">
          <button className='nav_btn'>MARKETPLACE</button>
        </Link>
        <button className="kakao_btn" type="button" onClick={loginHandler}>
          <img className="kakao_login" src={login} alt="kakao login" />
        </button>
      </>
    )
  }

  return (
    <Toolbar>
      <Link to="/">
        <img className="nav_logo" src={Logo} alt="logo" />
      </Link>
      <Box sx={{ flexGrow: 1 }} />
      {user.id ? <LoggedIn /> : <Logout /> }
    </Toolbar>
  );
};

export default Nav;
