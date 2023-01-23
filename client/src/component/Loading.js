import React from 'react'

import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {
  return (
      <div className='loading_background'>
        <div className='loading_text'>잠시만 기다려 주세요</div>
        <br/>
        <CircularProgress />
      </div>
  )
}
