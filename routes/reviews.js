const express = require("express");
//having multiple params on route gives null issues, mergeParams true fixes it
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Review = require("../models/review");
const {isLoggedIn} = require("../middleware")



//updating campground reviews
router.post("/", isLoggedIn, async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  console.log(review.author);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash("success", "Successfully posted review");
  res.redirect(`/campground/${campground._id}`);
});

//delete reviews
router.delete("/:reviewId", isLoggedIn, async (req, res) => {
  //$pull operator removes from an existing array all instances of a value or values that match a specified condition
  const { id, reviewId } = req.params;
  //using id find the campground, then pass an object which will have $pull operator which will pull reviewID from the reviews array
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted review ");
  res.redirect(`/campground/${id}`);
});

module.exports = router;
