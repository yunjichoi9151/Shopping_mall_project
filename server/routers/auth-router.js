const router = require("express").Router();

const userController = require("../controller/userController");

router.post("/join", userController.join);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;