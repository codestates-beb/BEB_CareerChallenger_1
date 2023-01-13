import { Card } from '@mui/material'
import { React, useState } from 'react'

import { TextField, FormControl, InputLabel, Select, MenuItem, CardContent } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

export const BookingInfo = () => {
  const [value, setValue] = useState(null);
  const [time, setTime] = useState('');

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <>
      <Card sx={{ maxWidth: 250, minWidth: 250 }}>
        <CardContent>
          <h3>관람일</h3>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          </LocalizationProvider>
          <h3>회차</h3>
            <FormControl sx={{ minWidth: 218 }}>
              <InputLabel id="select_label">선택 회차</InputLabel>
              <Select
                labelId="select_label"
                id="select"
                value={time}
                label="선택 회차"
                onChange={handleChange}
              >
                <MenuItem value={10}>1회 19:30</MenuItem>
                <MenuItem value={20}>2회 22:30</MenuItem>
              </Select>
            </FormControl>
          <h5>VIP석 53 / R석 89 / S석 9</h5>
          <button className='booking_btn'>예매하기</button>
        </CardContent>
      </Card>
    </>
  )
}
