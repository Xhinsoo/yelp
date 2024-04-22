const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Review = require("../models/review");
const { isLoggedIn, isAuthor } = require("../middleware");





//index page
router.get("/", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("index", { campgrounds });
});
//render new page
router.get("/new", isLoggedIn, (req, res) => {
  res.render("new");
});
// posting new camp to db
router.post("/", isLoggedIn, async (req, res, next) => {
  const campground = new Campground(req.body.campground); //making new object using campground class
  campground.author = req.user._id;
  await campground.save(); //saving it to DB
  req.flash("success", "Successfully made a new campground");
  res.redirect("/campground");
});
//render show page by the id
router.get("/:id",  async (req, res, next) => {
  try {
    const campground = await Campground.findById(req.params.id).populate({
      //populate the reviews, then on each review populate its author
      path: "reviews",
      populate:{
        path: "author"
      }
    }).populate("author"); //separately populate one author in that campground 
    if (!campground) {
      req.flash("error", "Cannot find that campground");
      return res.redirect("/campground");
    }
    res.render("show", { campground });
  } catch (e) {
    next(e);
  }
});

//render edit page and send put req
router.get("/:id/edit", isLoggedIn, isAuthor, async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "cannot find that campground");
    return res.redirect("/campground");
  }
  res.render("edit", { campground });
});

//put update route
router.put("/:id", isLoggedIn, isAuthor, async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  req.flash("success", "Successfully edited campground");
  res.redirect(`/campground/${campground._id}`);
});

//delete campground
router.delete("/:id", isLoggedIn, isAuthor, async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id); //this  method doesn't need .save
  req.flash("success", "Successfully deleted campground");
  res.redirect("/campground");
});

module.exports = router;
