const router = require("express").Router();

const userController = require("../controller/userController");

router.post("/join", userController.join);
router.post("/login", userController.login);

module.exports = router;