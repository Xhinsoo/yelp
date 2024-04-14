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