const router = require("express").Router();
const controller = require("../controller/user.controller");

router.get("/auth/kakao", controller.login);

module.exports = router;
