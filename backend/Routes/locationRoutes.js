const express = require("express");
const router = express.Router();
const locationController = require("../Controllers/locationController");

router.post("/form", locationController.registerLocation);
router.get("/show", locationController.readAllallLocation);

module.exports = router;
