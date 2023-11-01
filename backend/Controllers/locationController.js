const Location = require("../models/Location");

exports.registerLocation = async (req, res) => {
  try {
    const {
      locationName,
      locationDescription,
      country,
      state,
      city,
    } = req.body;

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
    if (!location) return res.status(404).send();
    res.send(location);
  } catch (error) {
    res.status(500).send(error);
  }
};

// exports.readAllUserwithSearcPaging = async (req, res) => {
//   const pageNumber = parseInt(req.query.page) || 1; // Ensure it's a number
//   const pageSize = 1; // Number of items per page
//   const searchQuery = req.query.search || {};
//   const sortBy = req.query.sortBy || "username";
//   const order = req.query.order === "desc" ? -1 : 1;

//   if (!pageNumber || pageNumber < 1) {
//     return res.status(400).json({ message: "Invalid page number." });
//   }

//   let query = {};
//   if (searchQuery) {
//     query = {
//       $or: [
//         { username: new RegExp(searchQuery, "gi") },
//         { email: new RegExp(searchQuery, "gi") },
//         { password: new RegExp(searchQuery, "gi") },
//       ],
//     };
//   }
//   try {
//     User.paginate(
//       query,
//       { page: pageNumber, limit: pageSize, sort: { [sortBy]: order } },
//       (err, result) => {
//         if (err) {
//           return res
//             .status(500)
//             .json({ message: "Error occurred while fetching users." });
//         }
//         const { docs, total, limit, page, pages } = result;
//         res.json({ users: docs, total, limit, page, pages });
//       }
//     );
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// exports.readUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).send();
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!user) return res.status(404).send();
//     res.send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).send();
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
