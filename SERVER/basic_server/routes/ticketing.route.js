const express = require('express');
const {test,draw,entry,registerTicket,isWinner,buyNFT} = require('../controller/ticketing.controller')
const router = express.Router();

// http://localhost:5001/ticketing/test
router.post('/test',test);

// http://localhost:5001/ticketing/draw
router.get('/draw',draw);

// http://localhost:5001/ticketing/entry
router.post('/entry',entry);

// http://localhost:5001/ticketing/registerTicket
router.get('/registerTicket',registerTicket);

// http://localhost:5001/ticketing/isWinner
router.get('/isWinner',isWinner);

// http://localhost:5001/ticketing/buyNFT
router.get('/buyNFT',buyNFT);


module.exports = router;