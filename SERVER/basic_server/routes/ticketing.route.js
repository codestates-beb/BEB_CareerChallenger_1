const express = require('express');
const {test,draw,entry} = require('../controller/ticketing.controller')
const router = express.Router();

// http://localhost:5001/test
router.get('/test',test);

// http://localhost:5001/draw
router.get('/draw',tesdrawt);

// http://localhost:5001/test
router.get('/entry',entry);


module.exports = router;