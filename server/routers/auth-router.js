const router = require("express").Router();

const signin = require("../controller/userController");
// const { authorization } = require("../config/JWTConfig");

router.post("/login", signin);
// router.get("/auth/logout", authorization, logout);
// router.post("/auth/register", signup);
// router.get("/auth/profile", authorization, profile);

module.exports = router;