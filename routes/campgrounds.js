const express = require("express");
const router = express.Router();
const Campground = require("../models/campground"); //Campground object that contains bunch of methods
const Review = require("../models/review");
const { isLoggedIn, isAuthor } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const {storage} = require("../cloudinary") //node automatically looks for index file
const upload = multer({storage});

router.route("/")
    .get(campgrounds.index) //index
    .post(isLoggedIn, upload.array("image"), campgrounds.createCampground); // posting new camp to db
    
    // .post(upload.array("image"),(req,res)=>{
    //     console.log(req.body, req.files)
    //     res.send("it work")
    // })

//render new page
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
    //render show page by the id
    .get(campgrounds.showCampground)
    //put update route
    .put(isLoggedIn, isAuthor, campgrounds.updateCampground)
    //delete campground
    .delete(isLoggedIn, isAuthor, campgrounds.deleteCampground);

//render edit page and send put req
router.get("/:id/edit", isLoggedIn, isAuthor, campgrounds.renderEditForm);



module.exports = router;
