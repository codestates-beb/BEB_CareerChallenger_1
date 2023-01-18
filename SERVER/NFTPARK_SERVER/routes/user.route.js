const router = require("express").Router();
const controller = require("../controller/user.controller");
const middleware = require("../controller/middleware.controller");

router.get("/auth/kakao", controller.KakaoLogin);
router.get("/userInfo", middleware.authMiddleware, controller.userInfo);

module.exports = router;
