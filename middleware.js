const Campground = require("./models/campground")
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  //session stores the serialised user, passport is going to deserialize it and fill req.user with it
  //i.e deserialize information from the session
  // console.log(req.user)
  //passport provides this helper method
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  }
  next();
};

//current-user helper


// storeReturnTo ()

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
      res.locals.returnTo = req.session.returnTo;
  }
  next();
}


//use authorization

module.exports.isAuthor = async(req,res,next)=>{
  const {id} = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "you do not have permission");
    return res.redirect(`/campground/${id}`);
  }
  next();
}

// route reminder campground/:id/reviews/:id
//review authorization
module.exports.isReviewAuthor = async(req,res,next)=>{
  const {id, reviewId} = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "you do not have permission");
    return res.redirect(`/campground/${id}`);
  }
  next();
}

