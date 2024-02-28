const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { route } = require("./productRoute");
const router = express.Router();



router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router