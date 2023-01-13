import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './Mypage.css';

export const Mypage = () => {
  return (
    <mypage>
      <TableContainer component={Paper} sx={{ width: 700 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>예매일</TableCell>
              <TableCell>상품명</TableCell>
              <TableCell>이용일 / 매수</TableCell>
              <TableCell>QR</TableCell>
              <TableCell>취소</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>2023.01.12</TableCell>
              <TableCell>BlackPink concert</TableCell>
              <TableCell>2023.01.27 / 2</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023.01.15</TableCell>
              <TableCell>BTS concert</TableCell>
              <TableCell>2023.01.30 / 1</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023.01.19</TableCell>
              <TableCell>Younha concert</TableCell>
              <TableCell>2023.02.05 / 1</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </mypage>
  )
}
