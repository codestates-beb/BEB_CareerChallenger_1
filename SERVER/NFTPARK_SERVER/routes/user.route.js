const router = require("express").Router();
const controller = require("../controller/user.controller");

router.get("/auth/kakao", controller.KakaoLogin);

module.exports = router;
