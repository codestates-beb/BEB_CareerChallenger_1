import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { Toolbar } from '@mui/material';

import './Main.css';
import { Mainbanner } from './component/Mainbanner';

export const Main = ({ concertinfo }) => {
  const navigate = useNavigate();

  return (
    <div className='main_container'>
      <Mainbanner concertinfo={concertinfo}/>
      <div className='line'/>
      <Toolbar>
        <Box sx={{ flexGrow: 0.1 }} />
        <h1>UPCOMING</h1>
        <Link to="/marketplace"><button className='more_btn'>MORE UPCOMING</button></Link>
      </Toolbar>
      <div className='concercard_container'>
        {concertinfo.map((data, idx) => {
          return (
            <div
            key={idx}
            onClick = {() => {
              navigate(`/detail/${data.id}`)
              window.scrollTo(0,0)
            }}>
              <Card sx={{ maxWidth: 250 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={data.image}
                    alt="img"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.singer_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.title}
                    </Typography>
                    <div className='main_card_line'></div>
                    <h3>KRW 130,000</h3>
                    <Typography variant="body2" color="text.secondary">
                      추첨인원 : 1200명
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          )
        })}
      </div>
      <div className='line'/>
    </div>
  )
}
