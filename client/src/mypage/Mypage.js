import React, { useState, useContext, useEffect } from "react";

import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { CancelModal } from './component/CancelModal';
import { SellModal } from './component/SellModal';
import { BuyModal } from './component/BuyModal';
import { QrModal } from './component/QrModal';
import { UseContext } from "../User/UserContextProvider";
import { getNFTList,myEntry,canClaim } from "../helper/web3";
import { Loading } from "../component/Loading";

export const Mypage = () => {
  const { user } = useContext(UseContext);
  const [isLoading, setIsLoading] = useState(false);

  const [myNft,setMyNft] = useState([])
  const [myEntryList,setMyEntryList] = useState([])
  const [tokenId, setTokenId] = useState('')

  const [isCheck,setIsCheck] = useState()
  const [isCanClaim,setIsCanClaim] = useState()
  useEffect(() => {
    try {
      setIsLoading(true)
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
      const getMyEntry = async() => {
        const result = await myEntry(user.address);
        setIsCheck(new Array(result.data.lengh).fill(false))
        setIsCanClaim(new Array(result.data.lengh).fill(false))
        setMyEntryList(result.data)
      }
      getNft();
      getMyEntry();
    } catch(err) {
      alert(err)
    } finally {
      setIsLoading(false)
    }
  },[])

  const checkCanClaim = async(e) => {
    const result = await canClaim(myEntryList[e.target.dataset.id].title,myEntryList[e.target.dataset.id].address)
    isCheck[e.target.dataset.id] = true;
    setIsCheck([...isCheck])
    isCanClaim[e.target.dataset.id] = result.data
    setIsCanClaim([...isCanClaim])
    console.log(result.data);
  }

  const LoadingTrue = () => {
    setIsLoading(true)
  }

  const LoadingFalse = () => {
    setIsLoading(false)
  }
  return (
    <div className='mypage_container'>
      {isLoading ? <Loading /> : <></>}
      <Typography variant="h2" align='center' fontWeight={700}>Mypage</Typography>
      <div className='mypage_line'/>
      <div className='mypage_content'>
        <h2>???????????? ?????? & ??????</h2>
        <TableContainer component={Paper} sx={{ width: 900 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>?????????</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>?????????</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>?????????</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>??????</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>??????</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>??????</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {myNft.map((data,index) => {
              return (<>
              <TableRow key={index}>
                <TableCell align='center'>2023.01.12</TableCell>
                <TableCell align='center'>{data.name}</TableCell>
                <TableCell align='center'>2023.01.27</TableCell>
                <TableCell align='center'>
                  <CancelModal LoadingFalse={LoadingFalse} LoadingTrue={LoadingTrue} tokenId={data.id} name={data.name}/>
                </TableCell>
                <TableCell align='center'>
                  <SellModal LoadingFalse={LoadingFalse} LoadingTrue={LoadingTrue} tokenId={data.id} name={data.name} />
                </TableCell>
                <TableCell align='center'>
                  <QrModal tokenId={data.id} name={data.name}/>
                </TableCell>
              </TableRow>
            </>)              
            })}
            </TableBody>
          </Table>
        </TableContainer>
        <h2 className='nftlist'>THE NFT ?????? ??????</h2>
        <TableContainer component={Paper} sx={{ width: 1200 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>????????????</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>?????????</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>??????</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>?????? ??????</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>?????? ?????????</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>????????????</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>????????????</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="body1" fontWeight={700}>??????</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myEntryList.map((data,index) => {
                return (<TableRow>
                  <TableCell align='center'>2023.01.12</TableCell>
                  <TableCell align='center'>{data.title}</TableCell>
                  <TableCell align='center'>KRW 130,000</TableCell>
                  <TableCell align='center'>2023.01.19 ~ 2023.01.25</TableCell>
                  <TableCell align='center'>2023.01.27</TableCell>
                  <TableCell align='center'>2023.01.29</TableCell>
                  <TableCell align='center' data-id={index} onClick={(e) => checkCanClaim(e)}>{isCheck[index] ?(isCanClaim[index] ? "??????" :"?????????") :"??????" }</TableCell>
                  <TableCell align='center'>
                  {isCheck[index] ?(isCanClaim[index] ? <BuyModal LoadingFalse ={LoadingFalse} LoadingTrue={LoadingTrue} address ={user.address} title ={data.title}/> :<CancelOutlinedIcon />) :<></> }
                  </TableCell>
                  </TableRow>)
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className='mypage_line'/>
    </div>
  )
}
