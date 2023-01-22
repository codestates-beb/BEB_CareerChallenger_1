import React, { useContext, useEffect, useState } from 'react'

import { Card, CardActionArea, CardMedia, CardContent, Typography, ButtonBase } from '@mui/material';

import './Main.css';

import { Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Mainbanner } from './component/Mainbanner';

export const Main = ({ concertinfo }) => {
  const navigate = useNavigate();

  return (
    <main>
      <Mainbanner />
      <div className='line'></div>
      <Toolbar>
        <h1>UPCOMING</h1>
        <Link to="/marketplace"><button className='more_btn'>MORE UPCOMING</button></Link>
      </Toolbar>
      <div className='concercard_container'>
        {concertinfo.map((data, idx) => {
          return (
            <div className='concercard'
              key={idx}
              onClick = {() => {
                navigate(`/detail/${data.id}`)
                window.scrollTo(0,0)
              }}
            >
              <Card sx={{ maxWidth: 250 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={data.image}
                    alt="img"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{data.singer_name}</Typography>
                    <Typography variant="body2" color="text.secondary">{data.title}</Typography>
                  </CardContent>
              </Card>
            </div>
          )
        })}
      </div>

      <div className='line'></div>
      <Toolbar>
        <h1>HOTISSUE</h1>
        <Link to="/marketplace/allconcert"><button className='more_btn'>MORE HOTISSUE</button></Link>
      </Toolbar>
      {/* <ConcertCard /> */}
    </main>
  )
}
