const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
const { longitudeLatitude } = require("../utils/geometry.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main().then(() => {
  console.log("Database connected successfully");
}).catch(err => {
  console.error("Database connection error:", err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68ca974d78156fcbbd56677e",
  }));
  await Listing.insertMany(initData.data);
  console.log(initData);
  console.log("Database initialized with sample data");

};

initDB().then(() => {
  mongoose.connection.close();
});
