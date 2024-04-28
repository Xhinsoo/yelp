const Campground = require("../models/campground");

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("index", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
  res.render("new");
};

module.exports.createCampground = async (req, res, next) => {
  const campground = new Campground(req.body.campground); //making new object using campground class
  //for each F, return an object. for implicit return need curly braces
  //that makes us array which contains simple objects (url and file name)
  //req.file = multer adds .file to req
  campground.image = req.files.map(f => ({url: f.path, filename: f.filename}))
  campground.author = req.user._id;
  await campground.save();
  console.log(campground.image)
  req.flash("success", "Successfully made a new campground");
  res.redirect("/campground");
};

module.exports.showCampground = async (req, res, next) => {
  try {
    const campground = await Campground.findById(req.params.id)
      .populate({
        //populate the reviews, then on each review populate its author
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("author"); //separately populate one author in that campground
    if (!campground) {
      req.flash("error", "Cannot find that campground");
      return res.redirect("/campground");
    }
    res.render("show", { campground });
  } catch (e) {
    next(e);
  }
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "cannot find that campground");
    return res.redirect("/campground");
  }
  res.render("edit", { campground });
};

module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
  campground.image.push(...imgs)
  campground.save()

  req.flash("success", "Successfully edited campground");
  res.redirect(`/campground/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id); //this  method doesn't need .save
  req.flash("success", "Successfully deleted campground");
  res.redirect("/campground");
};
