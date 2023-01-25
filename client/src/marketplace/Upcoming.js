import React from 'react'
import { useNavigate } from 'react-router';

import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

import './Marketplace.css';

export const Upcoming = ({ concertinfo }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h4" fontWeight={700} sx={{ m:3 }}>Upcoming</Typography>
      <div className='marketplacecard_container'>
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
                    <div className='upcoming_card_line'></div>
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
      <div className='marketplace_line'/>
    </div>
  )
}
