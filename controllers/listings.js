const Listing = require("../models/listing");
const { longitudeLatitude } = require("../utils//geometry");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/index.ejs', { allListings });
}

module.exports.renderNewForm = async (req, res) => {
  res.render('listings/new.ejs');
}

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author'
      },
    })
    .populate('owner');
  if (!listing) {
    req.flash('error', 'Cannot find that listing!');
    return res.redirect('/listings');
  }
  res.render("listings/show.ejs", { listing, myAPIKey: process.env.MAP_TOKEN });
}

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let fileName = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, fileName };
  let geometry = await longitudeLatitude(newListing.location.concat(",", newListing.country));
  newListing.geometry = geometry;
  console.log(geometry);
  await newListing.save();
  req.flash('success', 'Successfully added a new listing!');
  res.redirect(`/listings/${newListing._id}`);
}

module.exports.renderEdit = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash('error', 'Cannot find that listing!');
    return res.redirect('/listings');
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render('listings/edit.ejs', { listing, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  let updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true, runValidators: true });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let fileName = req.file.filename;
    updatedListing.image = { url, fileName };
    await updatedListing.save();
  }
  req.flash('success', 'Successfully Updated!');
  res.redirect(`/listings/${updatedListing._id}`);
}

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  req.flash('success', 'Successfully Delete!');
  res.redirect('/listings');
}