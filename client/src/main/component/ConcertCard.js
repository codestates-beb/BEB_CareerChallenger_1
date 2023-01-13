import React from 'react'

import bp from '../banner/blackpink.jpeg';
import bts from '../banner/bts.jpeg';
import idle from '../banner/i-dle.jpeg';
import younha from '../banner/younha.jpeg';

import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

export const ConcertCard = () => {
  return (
    <div className='concercard_container'>
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

      <Card sx={{ maxWidth: 250 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={bts}
            alt="img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            BTS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              BTS world tour
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 250 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={idle}
            alt="img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            i-dle
            </Typography>
            <Typography variant="body2" color="text.secondary">
            i-dle world tour asia 
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 250 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={younha}
            alt="img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            younha
            </Typography>
            <Typography variant="body2" color="text.secondary">
            younha world tour asia 
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
