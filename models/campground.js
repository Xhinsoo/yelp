const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review")

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
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
  console.log("deleted")
  console.log(doc)
})

//mongoose.model accepts 2 arguments, collection name and collection schema
module.exports = mongoose.model("Campground", CampgroundSchema);
