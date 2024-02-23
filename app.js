const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("connection open");
  })
  .catch((e) => {
    console.log("error is:", e);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});


app.get("/campground", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('index', {campgrounds})
});

app.get("/campground/:id", async (req,res)=>{
  const campground = await Campground.findById(req.params.id)
  res.render("show", {campground})
})

app.listen("3000", (req, res) => {
  console.log("listening to port 3000");
});
