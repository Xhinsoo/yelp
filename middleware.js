module.exports.isLoggedIn = (req, res, next) => {
  //session stores the serialised user, passport is going to deserialize it and fill req.user with it
  //i.e deserialize information from the session
  console.log(req.user)
  //passport provides this helper method
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  }
  next();
};
