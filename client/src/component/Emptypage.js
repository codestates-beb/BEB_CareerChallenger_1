import React from 'react';
import { useNavigate } from 'react-router';

import { Alert, AlertTitle } from '@mui/material';
import './Component.css';

export const Emptypage = () => {
  const navigate = useNavigate();

  return (
    <div className='emptypage_container'>
      <div className='emptymessage'>
        <Alert severity="error">
          <AlertTitle>비정상적인 접근입니다.</AlertTitle>
          주소가 올바른지 확인하시길 바랍니다.
          <button className='emptypage_btn' onClick={() => navigate('/')}>
            <strong>메인으로 돌아가기</strong>
          </button>
        </Alert>
      </div>
    </div>
  )
}
