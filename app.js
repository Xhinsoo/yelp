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

const Campground = require("./models/campground");
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
app.use(session(sessionConfig));
app.use(flash());

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

//setting the route handler prefix to /
//we can also add /campgrounds prefix to reduce code om router
app.use((req, res, next) => {
  //whatever is in flash("success") key, will be accessed via res.locals.success
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next()
});
app.use("/campground", campgrounds);
app.use("/campground/:id/reviews", reviews);

app.use((err, req, res, next) => {
  res.send("oh boy we have error");
});

app.listen("3000", (req, res) => {
  console.log("listening to port 3000");
});
