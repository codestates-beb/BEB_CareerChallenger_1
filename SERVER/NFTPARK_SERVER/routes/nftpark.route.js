const router = require("express").Router();
const controller = require("../controller/nftpark.controller");
const middleware = require("../controller/middleware.controller");

router.get("/concertInfo", middleware.redisMiddleware, controller.concertInfo);
router.get("/ticketInfo", controller.ticketInfo);
router.post("/detailInfo", controller.detailInfo);
module.exports = router;
