import React, { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import bp from './banner/blackpink.jpeg';
import bts from './banner/bts.jpeg';
import idle from './banner/i-dle.jpeg';
import younha from './banner/younha.jpeg';

import './Main.css';
import { ConcertCard } from './component/ConcertCard';
import { Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios";

export const Main = () => {
  const [concertinfo, setConcertinfo] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/nftpark/concertInfo', {
      withCredentials: true
    }).then((res) => {
      setConcertinfo(res.data.data);
      console.log(res.data.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 0,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false
  }

  return (
    <main>
      <Slider {...bannerSettings} className='slick_container'>
        <div className='banner_container'>
          <img className='sliderimg' src = {bp} alt='banner'/>
          <div className='banner_content_container'>
              <h2 className='banner_who'>BLACKPINK</h2>
              <h1 className='banner_title'>BORN PINK world tour asia</h1>
              <button className='banner_btn'>SHOW</button>  
          </div>
        </div>
        <div className='banner_container'>
          <img className='sliderimg' src = {bts} alt='banner'/>
          <div className='banner_content_container'>
              <h2 className='banner_who'>BTS</h2>
              <h1 className='banner_title'>Yet to Come in BUSAN</h1>
              <button className='banner_btn'>SHOW</button>
          </div>
        </div>
        <div className='banner_container'>
          <img className='sliderimg' src = {idle} alt='banner'/>
        </div>
        <div className='banner_container'>
          <img className='sliderimg' src = {younha} alt='banner'/>
        </div>
      </Slider>
      <div className='line'></div>
      <Toolbar>
        <h1>UPCOMING</h1>
        <Link to="/marketplace"><button className='more_btn'>MORE UPCOMING</button></Link>
      </Toolbar>
      {/* <ConcertCard /> */}
      <div className='line'></div>
      <Toolbar>
        <h1>HOTISSUE</h1>
        <Link to="/marketplace/allconcert"><button className='more_btn'>MORE HOTISSUE</button></Link>
      </Toolbar>
      {/* <ConcertCard /> */}
    </main>
  )
}
