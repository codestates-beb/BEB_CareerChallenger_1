import React from 'react'

import './Marketplace.css';
import bp from '../main/banner/blackpink.jpeg';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { MarketplaceCard } from './component/MarketplaceCard';


export const Allconcert = () => {
  return (
    <div>
      <h1>All Concerts</h1>
      <MarketplaceCard />
    </div>
  )
}
