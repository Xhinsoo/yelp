const express = require("express");
const router = express.Router();
const Campground = require("../models/campground"); //Campground object that contains bunch of methods
const Review = require("../models/review");
const { isLoggedIn, isAuthor } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");

//index page
router.get("/", campgrounds.index);

//render new page
router.get("/new", isLoggedIn, campgrounds.renderNewForm);
// posting new camp to db
router.post("/", isLoggedIn, campgrounds.createCampground);

//render show page by the id
router.get("/:id", campgrounds.showCampground);

//render edit page and send put req
router.get("/:id/edit", isLoggedIn, isAuthor, campgrounds.renderEditForm);

//put update route
router.put("/:id", isLoggedIn, isAuthor, campgrounds.updateCampground);

//delete campground
router.delete("/:id", isLoggedIn, isAuthor, campgrounds.deleteCampground);

module.exports = router;
