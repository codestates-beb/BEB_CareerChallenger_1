const express = require('express');
const controller = require('../controller/purchase.controller')
const router = express.Router();

// http://localhost:5001/purchase
router.post("/publicPurchase", controller.publicPurchase);
router.post("/privatePurchase", controller.privatePurchase);
module.exports = router;