import React from 'react'

import './Marketplace.css';
import bp from '../main/banner/blackpink.jpeg';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';


export const Allconcert = () => {
  return (
    <div>
      <h1>All Concerts</h1>
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
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
