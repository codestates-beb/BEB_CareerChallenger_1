import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './Mypage.css';
import QrCode2Icon from '@mui/icons-material/QrCode2';

import { CancelModal } from './component/CancelModal';
import { SellModal } from './component/SellModal';

export const Mypage = () => {
  return (
    <>
      <TableContainer component={Paper} sx={{ width: 750 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>예매일</TableCell>
              <TableCell>상품명</TableCell>
              <TableCell>이용일 / 매수</TableCell>
              <TableCell>상세</TableCell>
              <TableCell>판매</TableCell>
              <TableCell>입장</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>2023.01.12</TableCell>
              <TableCell>BlackPink concert</TableCell>
              <TableCell>2023.01.27 / 2</TableCell>
              <TableCell>
                <CancelModal/>
              </TableCell>
              <TableCell>
                <SellModal />
              </TableCell>
              <TableCell>
                <QrCode2Icon />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
