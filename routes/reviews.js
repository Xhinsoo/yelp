const express = require("express");
const router = express.Router();

//updating campground reviews
router.post("/", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  // console.log(review);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.redirect(`/campground/${campground._id}`);
});

//delete reviews
router.delete("/:reviewId", async (req, res) => {
  //$pull operator removes from an existing array all instances of a value or values that match a specified condition
  const { id, reviewId } = req.params;
  //using id find the campground, then pass an object which will have $pull operator which will pull reviewID from the reviews array
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/campground/${id}`);
});

module.exports = router;
