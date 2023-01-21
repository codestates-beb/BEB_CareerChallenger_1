const express = require('express');
const controller = require('../controller/listing.controller')
const router = express.Router();

// http://localhost:5001/listing
router.post("/publicListing", controller.publicListing);
router.post("/privateListing", controller.whiteListing);
module.exports = router;