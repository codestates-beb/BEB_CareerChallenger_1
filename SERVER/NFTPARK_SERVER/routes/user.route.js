const router = require("express").Router();
const controller = require("../controller/user.controller");

router.get("/auth/kakao", controller.KakaoLogin);
router.get("/userInfo", controller.authMiddleware, controller.userInfo);

module.exports = router;
