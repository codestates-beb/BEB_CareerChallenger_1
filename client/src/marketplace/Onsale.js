import React from 'react'
import './Marketplace.css';
import bp from '../main/banner/blackpink.jpeg';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import { MarketplaceCard } from './component/MarketplaceCard';

export const Onsale = () => {
  return (
    <div>
      <h1>On Sale</h1>
      <MarketplaceCard />
    </div>
  )
}
