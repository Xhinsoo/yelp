const express = require("express");
const router = express.Router();
const User = require("../models/user");
const flash = require("connect-flash");
const passport = require("passport")

router.get("/register", (req, res) => {
  res.render("users/register");
});

//async because in order to register user and work with mongoose, we need to await
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body; //destructure body
    const user = new User({ email, username }); //create new user
    const registeredUser = await User.register(user, password); //register document in mongoose
    req.flash("success", "welcome to yelpcamp!");
    res.redirect("/campground");
  } catch (e) {
    req.flash("error", e);
    res.redirect("register");
  }
});

router.get("/login",(req,res)=>{
    res.render("users/login")
})
//authenticate using local strategy. redirect to /login on failure, flash failure message if failure
router.post("/login",passport.authenticate("local",{failureFlash:true, failureRedirect:"/login"}),(req,res)=>{
 req.flash("success","welcome back");
 res.redirect("/campground")
})

module.exports = router;
