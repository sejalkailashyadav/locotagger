const express = require("express");
const router = express.Router();
const locationController = require("../Controllers/locationController");

router.post("/form", locationController.registerLocation);
router.get("/show", locationController.readAllallLocation);
router.delete("/delete/:id", locationController.deleteLocation);
router.delete("/deletelocations", locationController.deleteSelectedLocation);
router.put("/update/:id", locationController.updatedLocations);

module.exports = router;
