import React, { useState, useContext, useEffect } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './Mypage.css';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { CancelModal } from './component/CancelModal';
import { SellModal } from './component/SellModal';
import { BuyModal } from './component/BuyModal';
import { QrModal } from './component/QrModal';
import { UseContext } from "../User/UserContextProvider";
import { getNFTList } from "../helper/web3";

export const Mypage = () => {
  const { user, setUsers } = useContext(UseContext);
  const [myNft,setMyNft] = useState([])
  const [tokenId, setTokenId] = useState('')
  useEffect(() => {
    try {
      const getNft = async() => {
        const result = await getNFTList(user.address);
        const arr = result.ownedNfts.map((data) => {
          const rawData = {
            id : data.tokenId,
            name: data.rawMetadata.name,
            description: data.rawMetadata.description,
            image: data.rawMetadata.image,
            attributes: data.rawMetadata.attributes
          }
          return rawData;
        })
        setMyNft(arr)
        console.log(arr);
      }
      getNft();
    } catch(err) {
      alert(err)
    }
  },[])
  return (
    <div className='mypage_container'>
      <Typography variant="h2" align='center' fontWeight={700}>Mypage</Typography>
      <div className='mypage_line'/>
      <div className='mypage_content'>
        <h2>구매내역 확인 & 취소</h2>
        <TableContainer component={Paper} sx={{ width: 750 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>구매일</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>상품명</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>이용일</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>상세</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>판매</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>입장</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {myNft.map(() => {
              return (<>
              <TableRow>
                <TableCell align='center'>2023.01.12</TableCell>
                <TableCell align='center'>BlackPink concert</TableCell>
                <TableCell align='center'>2023.01.27 / 2</TableCell>
                <TableCell align='center'>
                  <CancelModal/>
                </TableCell>
                <TableCell align='center'>
                  <SellModal tokenId={tokenId} />
                </TableCell>
                <TableCell align='center'>
                  <QrModal />
                </TableCell>
              </TableRow>
            </>)              
            })}
            </TableBody>
          </Table>
        </TableContainer>
        <h2 className='nftlist'>THE NFT 응모 내역</h2>
        <TableContainer component={Paper} sx={{ width: 1100 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>응모일시</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>상품명</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>가격</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>응모 기간</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>당첨 발표일</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>구매일시</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>당첨여부</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>구매</Typography>
                </TableCell>
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
      </div>
      <div className='mypage_line'/>
    </div>
  )
}
