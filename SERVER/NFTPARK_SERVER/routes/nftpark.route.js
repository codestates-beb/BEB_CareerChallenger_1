const router = require("express").Router();
const controller = require("../controller/nftpark.controller");

router.get("/concertInfo", controller.concertInfo);
router.get("/ticketInfo", controller.ticketInfo);
module.exports = router;
