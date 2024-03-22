const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");

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
app.post("/campground", async (req, res, next) => {
  try {
    const campground = new Campground(req.body.campground); //making new object using campground class
    await campground.save(); //saving it to DB
    res.redirect("/campground");
  } catch (e) {
    next(e);
  }
});
//render show page by the id
app.get("/campground/:id", async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id).populate(
      "reviews"
    );
    console.log(campground);
    res.render("show", { campground });
  } catch (e) {
    res.status("401").send("This is the error:", e);
  }
});

//render edit page and send put req
app.get("/campground/:id/edit", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("edit", { campground });
});

//put update route
app.put("/campground/:id", async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground
  );
  await campground.save();
  res.redirect(`/campground/${campground._id}`);
});

//delete
app.delete("/campground/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id); //this  method doesn't need .save
  res.redirect("/campground");
});

app.post("/campground/:id/reviews", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  // console.log(review);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.redirect(`/campground/${campground._id}`);
});

app.delete("/campground/:id/reviews/:reviewId", async (req,res)=>{
  //$pull operator removes from an existing array all instances of a value or values that match a specified condition
  const {id, reviewId} = req.params;
  //using id find the campground, then pass an object which will have $pull operator which will pull reviewID from the reviews array
  await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
  await Review.findByIdAndDelete(reviewId)
  res.redirect(`/campground/${id}`)
  
})

app.use((err, req, res, next) => {
  res.send("oh boy we have error");
});

app.listen("3000", (req, res) => {
  console.log("listening to port 3000");
});
