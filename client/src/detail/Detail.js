import React from 'react'
import './Detail.css';
import { Card, Typography, CardContent, CardHeader, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';

export const Detail = ({ concertinfo }) => {
  const { id } = useParams();

  return (
    <div className='detail_container'>
      <div className='detail_info'>
        <div className='detail_img'>
          <img src = {concertinfo[id-1].image} alt='concertimg'/>
        </div>
        <div className='detail_text'>
          <Card sx={{ width: 330 }}>
            <CardContent>
              <Divider textAlign="left">장소</Divider>
              <Typography className='text_info'>{concertinfo[id-1].place}</Typography>
              <Divider textAlign="left">공연날짜</Divider>
              <Typography className='text_info'>{concertinfo[id-1].performancePeriod}</Typography>
              <Divider textAlign="left">출연진</Divider>
              <Typography className='text_info'>{concertinfo[id-1].singer_name}</Typography>
              <Divider textAlign="left">관람연령</Divider>
              <Typography className='text_info'>만 {concertinfo[id-1].ageLimit}세이상</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card sx={{ width: 430 }}>
        <CardHeader title={concertinfo[id-1].title}/>
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
          <button className='entry_btn'>응모하기</button>
        </CardContent>
      </Card>
    </div>
  )
}
