import React from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bp from '../banner/bp.png';
import asp from '../banner/asp.png';
import txt from '../banner/txt.png';
import st from '../banner/st.png';
import iu from '../banner/iu.png';

import { useNavigate } from 'react-router';
export const Mainbanner = () => {
  const navigate = useNavigate();

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
    <>
      <Slider {...bannerSettings} className='slick_container'>
        <div className='banner_container'>
          <img className='sliderimg' src = {bp} alt='banner'/>
          <div className='banner_content_container'>
            <h1 className='banner_who'>BLACKPINK</h1>
            <h2 className='banner_title'>BLACKPINK WORLD TOUR<br/>[BORN PINK]</h2>
            <button className='banner_btn' 
              onClick = {() => {
                navigate(`/detail/2`)
                window.scrollTo(0,0)
              }}>SHOW</button>  
            </div>
        </div>
        <div className='banner_container'>
          <img className='sliderimg' src = {asp} alt='banner'/>
          <div className='banner_content_container'>
            <h1 className='banner_who'>AESPA</h1>
            <h2 className='banner_title'>2023 aespa 1st Concert<br/>‘SYNK : HYPER LINE’</h2>
            <button className='banner_btn'
              onClick = {() => {
                navigate(`/detail/6`)
                window.scrollTo(0,0)
              }}>SHOW</button>
          </div>
        </div>
        <div className='banner_container'>
          <img className='sliderimg' src = {txt} alt='banner'/>
          <div className='banner_content_container'>
            <h1 className='banner_who'>TOMORROW X TOGETHER</h1>
            <h2 className='banner_title'>TOMORROW X TOGETHER WORLD TOUR<br/>〈ACT : SWEET MIRAGE〉 IN SEOUL</h2>
            <button className='banner_btn'
              onClick = {() => {
                navigate(`/detail/9`)
                window.scrollTo(0,0)
              }}>SHOW</button>
          </div>
        </div>
        <div className='banner_container'>
          <img className='sliderimg' src = {st} alt='banner'/>
          <div className='banner_content_container'>
            <h1 className='banner_who'>SEVENTEEN</h1>
            <h2 className='banner_title'>2023 SVT 7TH FAN MEETING<br/>〈SEVENTEEN in CARAT LAND〉</h2>
            <button className='banner_btn'
              onClick = {() => {
                navigate(`/detail/8`)
                window.scrollTo(0,0)
              }}>SHOW</button>
          </div>
        </div>
        <div className='banner_container'>
          <img className='sliderimg' src = {iu} alt='banner'/>
          <div className='banner_content_container'>
            <h1 className='banner_who'>IU</h1>
            <h2 className='banner_title'>2023 IU CONCERT<br/>〈The Golden Hour : 오렌지 태양 아래〉</h2>
            <button className='banner_btn'
              onClick = {() => {
                navigate(`/detail/10`)
                window.scrollTo(0,0)
              }}>SHOW</button>
          </div>
        </div>
      </Slider>
    </>
  )
}
