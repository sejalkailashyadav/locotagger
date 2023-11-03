const Location = require("../models/Location");

exports.registerLocation = async (req, res) => {
  try {
    const { locationName, locationDescription, country, state, city } =
      req.body;

    const location = new Location({
      locationName,
      locationDescription,
      country,
      state,
      city,
    });

    const savedLocation = await location.save();

    res.status(201).json({
      message: "Location data created successfully",
      location: savedLocation,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Invalid location data.", details: error.errors });
    } else {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  }
};

exports.readAllallLocation = async (req, res) => {
  try {
    const location = await Location.find({});
    res.send(location);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) return res.status(404).send();

    const updatedLocations = await Location.find({});

    res.send(updatedLocations);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // if (!location) return res.status(404).send();
    res.send(location);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteSelectedLocation = async (req, res) => {
  const idsToDelete = req.body.ids;

  try {
    const deleteResult = await Location.deleteMany({
      _id: { $in: idsToDelete },
    });
    const updatedLocations = await Location.find({});
    res.send(updatedLocations);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
