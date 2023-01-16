import React from 'react'
import './Marketplace.css';
import bp from '../main/banner/blackpink.jpeg';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';

export const Onsale = () => {
  return (
    <div>
      <h1>On Sale</h1>
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
            <div className='sale_price'>
              <div className='price_icon'>
                <PaymentsIcon />
              </div>
              <div className='price'>
              <Typography variant="subtitle1" color="text.secondary">120,000원</Typography>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
