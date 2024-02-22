const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  price: String,
  description: String,
  location: String,
});

//mongoose.model accepts 2 arguments, collection name and collection schema
module.exports = mongoose.model("Campground", CampgroundSchema);
