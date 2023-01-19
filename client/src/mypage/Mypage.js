import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './Mypage.css';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { CancelModal } from './component/CancelModal';
import { SellModal } from './component/SellModal';
import { BuyModal } from './component/BuyModal';

export const Mypage = () => {
  return (
    <>
      <h1>구매내역 확인 & 취소</h1>
      <TableContainer component={Paper} sx={{ width: 750 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>구매일</TableCell>
              <TableCell align='center'>상품명</TableCell>
              <TableCell align='center'>이용일</TableCell>
              <TableCell align='center'>상세</TableCell>
              <TableCell align='center'>판매</TableCell>
              <TableCell align='center'>입장</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='center'>2023.01.12</TableCell>
              <TableCell align='center'>BlackPink concert</TableCell>
              <TableCell align='center'>2023.01.27 / 2</TableCell>
              <TableCell align='center'>
                <CancelModal/>
              </TableCell>
              <TableCell align='center'>
                <SellModal />
              </TableCell>
              <TableCell align='center'>
                <QrCode2Icon />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <h1>THE NFT 응모 내역</h1>
      <TableContainer component={Paper} sx={{ width: 1000 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>응모일시</TableCell>
              <TableCell align='center'>상품명</TableCell>
              <TableCell align='center'>가격</TableCell>
              <TableCell align='center'>응모 기간</TableCell>
              <TableCell align='center'>당첨 발표일</TableCell>
              <TableCell align='center'>구매일시</TableCell>
              <TableCell align='center'>당첨여부</TableCell>
              <TableCell align='center'>구매</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='center'>2023.01.12</TableCell>
              <TableCell align='center'>BlackPink concert</TableCell>
              <TableCell align='center'>KRW 130,000</TableCell>
              <TableCell align='center'>2023.01.19 ~ 2023.01.25</TableCell>
              <TableCell align='center'>2023.01.27</TableCell>
              <TableCell align='center'>2023.01.29</TableCell>
              <TableCell align='center'>당첨</TableCell>
              <TableCell align='center'>
                <BuyModal />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align='center'>2023.01.12</TableCell>
              <TableCell align='center'>BlackPink concert</TableCell>
              <TableCell align='center'>KRW 130,000</TableCell>
              <TableCell align='center'>2023.01.19 ~ 2023.01.25</TableCell>
              <TableCell align='center'>2023.01.27</TableCell>
              <TableCell align='center'>2023.01.29</TableCell>
              <TableCell align='center'>미당첨</TableCell>
              <TableCell align='center'>
                <CancelOutlinedIcon />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
