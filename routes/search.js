const express = require("express");
const { searchByLocation } = require("../controllers/searchController");
const router = express.Router();


router.get("/location", searchByLocation);

module.exports = router;