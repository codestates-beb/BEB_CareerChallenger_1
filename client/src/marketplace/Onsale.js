import React from 'react'

import { Card, CardMedia, CardContent, Typography, Toolbar, CardActions } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import './Marketplace.css';
import bp from '../main/banner/bp.png';
import { BuyOnsaleModal } from './component/BuyOnsaleModal';

export const Onsale = () => {
  return (
    <div>
      <Typography variant="h4" fontWeight={700} sx={{ m:3 }}>On Sale</Typography>
      <div className='onsalecard_container'>
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
      <div className='marketplace_line'/>
    </div>
  )
}
