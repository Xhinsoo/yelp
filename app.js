const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
//returns a new router object
const campgrounds = require("./routes/campgrounds");

const Campground = require("./models/campground");
const Review = require("./models/review");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
app.use("/", campgrounds)


app.use((err, req, res, next) => {
  res.send("oh boy we have error");
});

app.listen("3000", (req, res) => {
  console.log("listening to port 3000");
});
