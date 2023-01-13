import React from 'react'
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

export const Main = () => {
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
      <div className='concert_container'>
        <div className='main_title'>
          <Toolbar>
            <h1>관심집중 핫 이슈 콘서트</h1>
            <button className='more_btn'>MORE CONCERT</button>
          </Toolbar>
        </div>
        <ConcertCard />
      </div>
    </main>
  )
}
