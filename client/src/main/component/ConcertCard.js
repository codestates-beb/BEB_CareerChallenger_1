import React, { useState, useEffect, useNavigate } from 'react'

import axios from "axios";

import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

export const ConcertCard = () => {
  const navigate = useNavigate();
  const [concertinfo, setConcertinfo] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/nftpark/concertInfo', {
      withCredentials: true
    }).then((res) => {
      setConcertinfo(res.data.data);
      console.log(res.data.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <div className='concercard_container'>
      {concertinfo.map((data, idx) => {
        return (
          <Card 
            sx={{ maxWidth: 250 }} 
            onClick = {() => {
              navigate(`/upcomingdetail/concert/${data.id}`)
              window.scrollTo(0,0)
            }}
            key={idx}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={data.image}
                alt="img"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">{data.singer_name}</Typography>
                <Typography variant="body2" color="text.secondary">{data.title}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )
      })}
    </div>
  )
}
