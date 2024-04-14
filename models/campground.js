const mongoose = require("mongoose");
const Schema = mongoose.Schema; //short cut
const Review = require("./review");
const User = require("./user");

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref:"User"
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});
//doc is deleted but can also be passed to our middleware
CampgroundSchema.post("findOneAndDelete", async function(doc){
  if(doc){
    //delete all reviews, where there id field is in our document that was just deleted 
    await Review.deleteMany({
      _id:{
        $in: doc.reviews
      }
    })
  }

})

//mongoose.model accepts 2 arguments, collection name and collection schema
module.exports = mongoose.model("Campground", CampgroundSchema);
