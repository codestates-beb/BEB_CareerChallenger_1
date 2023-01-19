import React from 'react'

import './Marketplace.css';
import bp from '../main/banner/blackpink.jpeg';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

export const Upcoming = () => {
  return (
    <div>
      <h1>Upcoming</h1>
      <Card sx={{ maxWidth: 250 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={bp}
            alt="img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            BLACKPINK
            </Typography>
            <Typography variant="body2" color="text.secondary">
              BORN PINK world tour asia 
            </Typography>
            <div className='marketplace_card_line'></div>
            <h3>KRW 130,000</h3>
            <Typography variant="body2" color="text.secondary">
              응모인원 : 13000명
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
