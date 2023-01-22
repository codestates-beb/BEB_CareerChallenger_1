import React, { useState } from 'react'
import './Marketplace.css';
import bp from '../main/banner/blackpink.jpeg';
import { Card, CardMedia, CardContent, Typography, Toolbar, CardActions } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { BuyOnsaleModal } from './component/BuyOnsaleModal';


export const Onsale = () => {
  return (
    <div>
      <h1>On Sale</h1>
      <div className='marketplacecard_container'>
        <Card sx={{ width: 298, height: 300 }} >
          <CardMedia
            component="img"
            height="140"
            image={bp}
            alt="img"
          />
          <CardContent>
            <div className='onsale_card_left'>
              <Typography gutterBottom variant="h5" component="div" align="center">
              BLACKPINK
              </Typography>
              <Typography gutterBottom variant="body2" color="text.secondary" align="center">
                BORN PINK world tour asia 
              </Typography>
            </div>
            <div className='onsale_card_right'>
              <CardActions>
                <BuyOnsaleModal />
              </CardActions>
            </div>
            <div className='onsale_card_line'></div>
            <Toolbar>
              <Typography variant="subtitle2" className='onsale_price'>KRW 130,000</Typography>
              <KeyboardArrowRightIcon />
              <Typography variant="body" sx={{ fontWeight: 'bold' }}>KRW 120,000</Typography>
            </Toolbar>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
