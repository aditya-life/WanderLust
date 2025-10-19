const mongoose = require("mongoose");
const Listing = require('../models/listing');

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

exports.searchByLocation = async (req, res) => {
    const { location } = req.query;

    if (!location) {
        return res.status(400).send("Location query parameter is required");
    }

    try {
        const regex = new RegExp(escapeRegex(location), 'i');
        const allListings = await Listing.find({ location: regex });

        res.render('listings/index.ejs', { allListings });
        
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).send("Error occurred while searching");
    }
};
