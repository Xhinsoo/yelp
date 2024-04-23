const express = require("express");
const router = express.Router();
const User = require("../models/user");
const flash = require("connect-flash");
const passport = require("passport");
const users = require("../controllers/users")

const { storeReturnTo } = require("../middleware");

router.get("/register", users.renderRegister);

//async because in order to register user and work with mongoose, we need to await
router.post("/register", users.register);

router.get("/login", users.renderLogin);

//authenticate using local strategy. redirect to /login on failure, flash failure message if failure
router.post("/login",storeReturnTo,passport.authenticate("local", {failureFlash: true,
    failureRedirect: "/login",}), users.login);

router.get("/logout", users.logout);

module.exports = router;
