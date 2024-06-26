const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("connection open");
  })
  .catch((e) => {
    console.log("error is:", e);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

//run nodemon on seed index.js file to update changes 
const seedDB = async () => {
  await Campground.deleteMany({}); //deletes everything in DB and adds new locations
  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random()*20) +10
    const camp = new Campground({
      author: "661be10dc1c2da2d52a6fc63",
      location: `${cities[rand1000].city},${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "lorem ipsum labore ist deserunt dolor amet consectetur",
      price,
      image: [
        {
          url: 'https://res.cloudinary.com/dimjnzabs/image/upload/v1714310561/YelpCamp/wonuhh94pd9bp3o6ztne.png',
          filename: 'YelpCamp/wonuhh94pd9bp3o6ztne',
        },
        {
          url: 'https://res.cloudinary.com/dimjnzabs/image/upload/v1714310561/YelpCamp/dmtpmkaovnqo7hj4cw8k.png',
          filename: 'YelpCamp/dmtpmkaovnqo7hj4cw8k',
        }        
      ]
    });
    await camp.save();
  }
};

//returns promise bcas its async ()
seedDB();
