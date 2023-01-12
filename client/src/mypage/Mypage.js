import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './Mypage.css';

export const Mypage = () => {

  return (
    <mypage>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>예매일</TableCell>
              <TableCell>공연명</TableCell>
              <TableCell>관람일</TableCell>
              <TableCell>매수</TableCell>
              <TableCell>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">sfd
                </TableCell>
                <TableCell>dsf</TableCell>
                <TableCell>asdf</TableCell>
                <TableCell>sdf</TableCell>
                <TableCell>sadf</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </mypage>
  )
}
