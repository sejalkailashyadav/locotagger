const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  locationDescription: { type: String, required: true },
  country: String,
  state: String,
  city: String,
});
module.exports = mongoose.model("Location", locationSchema);
