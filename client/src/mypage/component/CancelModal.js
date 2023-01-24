import React, { useState } from 'react'

import { Typography, Modal, Card, CardContent } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import '../Mypage.css';

export const CancelModal = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TaskAltIcon onClick={handleOpen}/> 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className='mypage_modal' sx={{ maxWidth: 500 }}>
          <CardContent>
            <div className='modal_line'/>
            <h2 className='modal_title'>티켓 예매 상세내역</h2>
            <div className='modal_text'>
              <Typography className='modal_text1'>CONCERT</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>CRUSH ON YOU TOUR ［CRUSH HOUR］ ENCORE</Typography>
            </div>
            <div className='modal_info'>
              <Typography variant="h6" sx={{ mt: 2 }}>티켓 정보</Typography>
              <div className='ticketinfo_box'>
                <Typography>토큰ID | 23454353</Typography>
                <Typography sx={{ mt: 1 }}>관람일시 | 2023.01.27 14:00 1회</Typography>
                <Typography sx={{ mt: 1 }}>예매일 | 2023.01.20</Typography>
                <Typography sx={{ mt: 1 }}>예매자명 | 홍길동</Typography>
                <Typography sx={{ mt: 1 }}>좌석 | VIP석</Typography>
                <Typography sx={{ mt: 1 }}>결제 금액 | 130,000원</Typography>
              </div>
              <div className='modal_line2'/>
              <ErrorOutlineIcon color="error"/>
              <Typography sx={{ mt: 1 }}>- 예매 수수료는 예매일 이후 취소 시에는 환불되지 않습니다.</Typography>
              <Typography sx={{ mt: 1 }}>- 취소수수료는 취소시점에 따라 달라집니다.</Typography>
              <Typography sx={{ mt: 1 }}>- 취소 진행 전, 반드시 주의 사항을 확인하시기 바랍니다.</Typography>
            </div>
            <div className='modal_line'/>
            <button className='modal_btn'>취 소 하 기</button>
          </CardContent >
        </Card>
      </Modal>
    </div>
  )
}
