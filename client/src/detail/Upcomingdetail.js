import React, { useState } from 'react'
import './Detail.css';
import concertimg from './concertimg.gif';
import { Card, Typography, CardContent, CardHeader, Divider, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

export const Upcomingdetail = () => {
  const [rankpick, setRankpick] = useState('');

  const handleRankpick = (e) => {
    setRankpick(e.target.value);
  };

  return (
    <div className='detail_container'>
      <div className='detail_info'>
        <div className='detail_img'>
          <img src = {concertimg} alt='concertimg'/>
        </div>
        <div className='detail_text'>
          <Card sx={{ width: 330 }}>
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
              <Typography className='text_info' gutterBottom>스탠딩132,000원 / 지정석 SR132,000원 
              <br/> 지정석 R121,000원 / 지정석 S110,000원</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card sx={{ width: 477 }}>
        <CardHeader title="CRUSH ON YOU TOUR ［CRUSH HOUR］ ENCORE" />
        <CardContent>
          <h3>KRW 130,000</h3>
          <div className='detail_line'/>
          <Typography variant="body2" gutterBottom>응모기간</Typography>
          <Typography variant="body1">2023.01.26 ~ 2023.01.27</Typography>
          <div className='detail_line'/>
          <Typography variant="body2" gutterBottom>당첨자 발표</Typography>
          <h2>2023.01.27</h2>
          <div className='detail_line'/>
          <Typography variant="body2" gutterBottom>당첨자 구매일</Typography>
          <Typography variant="body1">2023.01.20 까지</Typography>
          <div className='detail_line'/>
          <Typography variant="body2" gutterBottom>참여자 수</Typography>
          <Typography variant="body1" gutterBottom>1000명 참여</Typography>
          <div className='separate_line'/>
          <Typography sx={{ mt: 1 }}>- 응모 이후 수정은 불가합니다.</Typography>
          <Typography sx={{ mt: 1 }}>- 당첨 결과는 마이페이지에서 확인하실 수 있습니다.</Typography>
          <Typography sx={{ mt: 1 }}>- 당첨 시, 카카오톡으로 안내 등이 발송됩니다. </Typography>
          <div className='detail_line'/>
          <h5>VIP석 10 / R석 20 / S석 90 / A석 110</h5>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="select_label">좌석 선택</InputLabel>
              <Select
                labelId="select_label"
                id="selectrank"
                value={rankpick}
                label="좌석 선택"
                onChange={handleRankpick}
              >
                <MenuItem value={10}>VIP석</MenuItem>
                <MenuItem value={20}>R석</MenuItem>
                <MenuItem value={30}>S석</MenuItem>
                <MenuItem value={40}>A석</MenuItem>
              </Select>
            </FormControl>
            <button className='entry_btn'>응모하기</button>
          </Box>
        </CardContent>
      </Card>
      </div>

  )
}
