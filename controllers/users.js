module.exports.renderRegister = (req, res) => {
    res.render("users/register");
  }

module.exports.register = async (req, res) => {
    try {
      const { email, username, password } = req.body; //destructure body
      const user = new User({ email, username }); //create new user
      const registeredUser = await User.register(user, password); //register document in mongoose
      //redirect to login after successful registration
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to Yelpcamp!");
        res.redirect("/campground");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("register");
    }
  }

  module.exports.renderLogin = (req, res) => {
    res.render("users/login");
  }

module.exports.login =  (req, res) => {
    try{
      req.flash("success", "welcome back");
      const redirectUrl = res.locals.returnTo || "/campground";
      delete req.session.returnTo;
      res.redirect(redirectUrl);
    }
    catch(e){
      req.flash("error", e.message);
    }
  }


module.exports.logout = (req, res, next) => {
    //logout requires cb () as argument since new update
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "goodbye");
      res.redirect("/campground");
    });
  }
