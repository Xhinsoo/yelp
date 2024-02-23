const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

//index page
app.get("/campground", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("index", { campgrounds });
});
//render new page
app.get("/campground/new", (req, res) => {
  res.render("new");
});
// posting new camp to db
app.post("/campground", async (req, res) => {
  const campground = new Campground(req.body.campground); //making new object using campground class
  await campground.save(); //saving it to DB
  res.redirect("/campground");
});
//render detail page by the id
app.get("/campground/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("show", { campground });
});

//render edit page and send put req
app.get("/campground/:id/edit", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("edit", { campground });
});

//put update route
app.put("/campground/:id", async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
  await campground.save();
  res.redirect(`/campground/${campground._id}`);
});

app.listen("3000", (req, res) => {
  console.log("listening to port 3000");
});
