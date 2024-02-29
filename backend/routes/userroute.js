const express = require("express");
const { registerUser, loginUser, logOutUser, forgotPassword } = require("../controllers/userController");
const { route } = require("./productRoute");
const router = express.Router();



router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logOutUser);

module.exports = router