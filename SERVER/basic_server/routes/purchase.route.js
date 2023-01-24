const express = require('express');
const {publicPurchase, privatePurchase} = require('../controller/purchase.controller')
const router = express.Router();

// http://localhost:5001/purchase
router.post("/publicPurchase", publicPurchase);
router.post("/privatePurchase", privatePurchase);

module.exports = router;