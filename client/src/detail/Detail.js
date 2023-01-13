import { Divider, Card, Typography, CardContent } from '@mui/material';
import React from 'react'
import { BookingInfo } from './component/BookingInfo';
import concertimg from './concertimg.gif';

import './Detail.css';

export const Detail = () => {
  return (
    <div className='detail_container'>
      <h1>CRUSH ON YOU TOUR ［CRUSH HOUR］ ENCORE</h1>
      <div className='detail_info'>
        <div className='detail_img'>
          <img src = {concertimg} alt='concertimg'/>
        </div>
        <div className='detail_text'>
          <Card sx={{ maxWidth: 330, minWidth: 330 }}>
            <CardContent>
              <Divider textAlign="left">장소</Divider>
              <Typography className='text_info'>KSPO DOME</Typography>
              <Divider textAlign="left">공연기간</Divider>
              <Typography className='text_info'>2023.01.28</Typography>
              <Divider textAlign="left">공연시간</Divider>
              <Typography className='text_info'>150분</Typography>
              <Divider textAlign="left">관람연령</Divider>
              <Typography className='text_info'>만 7세이상</Typography>
              <Divider textAlign="left">가격</Divider>
              <Typography className='text_info'>스탠딩132,000원 / 지정석 SR132,000원 <br/> 지정석 R121,000원 / 지정석 S110,000원</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className='detail_booking'>
        <BookingInfo />
      </div>
    </div>

        
   
  )
}
