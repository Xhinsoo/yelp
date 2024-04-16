const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
//returns a new router object
const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const Campground = require("./models/campground");
const User = require("./models/user");
const userRoutes = require("./routes/users")
const Review = require("./models/review");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
//setting session
const sessionConfig = {
  secret: "thisissecret",
  resave: false,
  saveUnitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
//session is before passport.session()
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
//passport please use localstrategy, and for local strategy authentication method will be found in user.authenticate()
//passport local mongoose automatically adds static methods to User model. i.e:authenticate(), serialiseUser() and so on.
//generates fn() that is used in Passport local strategy
passport.use(new LocalStrategy(User.authenticate()));

//passport local mongoose plugin methods
//generates fn() that will serialise users into session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("connection open");
  })
  .catch((e) => {
    console.log("error is:", e);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//setting the route handler prefix to.we can also add /campgrounds prefix to reduce code om router
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  //whatever is in flash("success") key, will be accessed via res.locals.success
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/fakeUser",async(req,res,next)=>{
  const user = new User({email: "chin@gmail.com", username:"chin"});
  //adds new user object and adds to the DB
  const newUser = await User.register(user, "chicken");
  res.send(newUser)
})
app.use("/campground", campgrounds);
app.use("/campground/:id/reviews", reviews);
app.use("/", userRoutes);

app.use((err, req, res, next) => {
  res.send("oh boy we have error");
});

app.listen("3000", (req, res) => {
  console.log("listening to port 3000");
});
