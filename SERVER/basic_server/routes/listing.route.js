const express = require('express');
const router = express.Router();

const { publicListing, whiteListing } = require('../controller/listing.controller')

// http://localhost:5001/listing
router.post('/publicListing', publicListing);
router.post('/privateListing', whiteListing);
module.exports = router;