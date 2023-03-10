import React, { useState, useContext } from 'react'
import QRCode from "react-qr-code";

import { Typography, Modal, Card, CardContent } from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { UseContext } from "../../User/UserContextProvider";

import '../Mypage.css';

export const QrModal = (props) => {
  const { user } = useContext(UseContext);
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
            <div className='modal_text'>
              <Typography className='modal_text1'>CONCERT</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>{props.name}</Typography>
            </div>
            <div className='modal_info'>
              <Typography variant="h6" sx={{ mt: 2 }}>티켓 정보</Typography>
              <div className='ticketinfo_box'>
                <Typography>토큰ID | {props.tokenId}</Typography>
                <Typography sx={{ mt: 1 }}>관람일시 | 2023.01.27</Typography>
                <Typography sx={{ mt: 1 }}>예매일 | 2023.01.20</Typography>
                <Typography sx={{ mt: 1 }}>예매자명 | {user.nickname}</Typography>
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
