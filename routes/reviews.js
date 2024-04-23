const reviews = require("../controllers/reviews");

const express = require("express");
//having multiple params on route gives null issues, mergeParams true fixes it
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Review = require("../models/review");
const { isLoggedIn, isReviewAuthor } = require("../middleware");

//updating campground reviews
router.post("/", isLoggedIn, reviews.createReview);

//delete reviews
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviews.deleteReview);

module.exports = router;
