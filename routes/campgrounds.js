const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Review = require("../models/review");

//index page
router.get("/", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("index", { campgrounds });
});
//render new page
router.get("/new", (req, res) => {
  res.render("new");
});
// posting new camp to db
router.post("/", async (req, res, next) => {
  try {
    const campground = new Campground(req.body.campground); //making new object using campground class
    await campground.save(); //saving it to DB
    req.flash("success", "Successfully made a new campground");
    res.redirect("/campground");
  } catch (e) {
    next(e);
  }
});
//render show page by the id
router.get("/:id", async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id).populate(
      "reviews"
    );
    // console.log(campground);
    res.render("show", { campground});
  } catch (e) {
    res.status(401).send(e);
  }
});

//render edit page and send put req
router.get("/:id/edit", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("edit", { campground });
});

//put update route
router.put("/:id", async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground
  );
  await campground.save();
  req.flash("success", "Successfully edited campground")
  res.redirect(`/campground/${campground._id}`);
});

//delete campground
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id); //this  method doesn't need .save  res.redirect("/campground");
});

module.exports = router;
