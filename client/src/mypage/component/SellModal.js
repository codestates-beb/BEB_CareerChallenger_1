import React, { useState, useContext} from 'react'
import { Typography, Modal, Card, CardContent, Box, TextField, InputAdornment, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import '../Mypage.css';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { UseContext } from "../../User/UserContextProvider";
import { publicListing, privateListing } from "../../api/listing";

export const SellModal = (props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUsers } = useContext(UseContext);
  const [whiteList, setWhiteList] = useState(false);
  const [whiteListId, setWhiteListId] = useState('');
  const [cost, setCost] = useState({
    cost : 0
  });
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleWhite = (e) => {
    if(e.target.checked) {
      setWhiteList(true)
    } else {
      setWhiteList(false)
    }
  }
  
  return (
    <div>
      <ConfirmationNumberIcon onClick={handleOpen}/> 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className='mypage_modal' sx={{ maxWidth: 512 }}>
          <CardContent>
            <div className='modal_line'/>
            <h2 className='modal_title'>내 티켓 판매하기</h2>
            <div className='modal_text'>
              <Typography className='modal_text1'>CONCERT</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>CRUSH ON YOU TOUR ［CRUSH HOUR］ ENCORE</Typography>
            </div>
            <div className='modal_info'>
              <Typography variant="h6" sx={{ mt: 2 }}>티켓 정보</Typography>
              <div className='sellticketinfo_box'>
                <Typography>토큰ID | 23454353</Typography>
                <Typography sx={{ mt: 1 }}>관람일시 | 2023.01.27 14:00 1회</Typography>
                <Typography sx={{ mt: 1 }}>예매일 | 2023.01.20</Typography>
                <Typography sx={{ mt: 1 }}>예매자명 | 홍길동</Typography>
                <Typography sx={{ mt: 1 }}>좌석 | VIP석</Typography>
                <Typography sx={{ mt: 1 }}>구매 금액 | 130,000원</Typography>
              </div>
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="화이트리스트 판매를 원하시면 왼쪽 체크박스를 눌러주세요"
                labelPlacement="end"
                onClick={handleWhite}
              />
              <FormGroup row>
                {whiteList ? 
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', mr: 2.5 }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input" label="지갑 주소를 입력해주세요" variant="standard" onChange={
                  (e) => {setWhiteListId(e.target.value)                  
                }} />
                  </Box>
                : <></>}
                <TextField
                id="modal_price"
                label="희망 가격"
                type="number"
                variant="standard"
                onChange={
                  (e) => {setCost(e.target.value)                  
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">원</InputAdornment>,
                }}
              />
              </FormGroup>
              <div className='modal_line2'/>
              <ErrorOutlineIcon color="error"/>
              <Typography sx={{ mt: 1 }}>- 희망 가격은 구매 가격을 초과할 수 없습니다.</Typography>
              <Typography sx={{ mt: 1 }}>- 판매 완료된 후에는 취소할 수 없습니다.</Typography>
              <Typography sx={{ mt: 1 }}>- 상품을 올리기 전, 반드시 주의 사항을 확인하시기 바랍니다.</Typography>
            </div>
            <div className='modal_line'/>
            <button 
            className='modal_btn'
            onClick={() => {
              if (whiteList === false){
                publicListing({
                  owner : user.address,
                  tokenId : props.tokenId,
                  cost : cost,
                })  
              } else {
                privateListing({
                  owner : user.address,
                  tokenId : props.tokenId,
                  to : whiteListId,
                  cost : cost,
                })  
              }
              
            }}
            >완 료</button>
          </CardContent >
        </Card>
      </Modal>
    </div>
  )
}
