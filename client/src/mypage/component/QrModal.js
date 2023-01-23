import React, { useState } from 'react'
import { Typography, Modal, Card, CardContent } from '@mui/material';
import '../Mypage.css';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import QRCode from "react-qr-code";
import concertimg from '../../detail/concertimg.gif';

export const QrModal = () => {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <QrCode2Icon onClick={handleOpen}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className='mypage_modal' sx={{ maxWidth: 500 }}>
          <CardContent>
          <div className='modal_line'/>
            <h2 className='modal_title'>입장 QR</h2>
            <div className='modal_imgtext'>
              <div className='modal_img'>
                <img src = {concertimg} alt='concertimg'/>
              </div>
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
              <QRCode
                size={256}
                style={{ height: "auto", width: "100px", marginLeft: "37%"}}
                value="hey"
                viewBox={`0 0 256 256`}
              />
            </div>
            <div className='modal_line'/>
          </CardContent >
        </Card>
      </Modal>
    </div>
  )
}
