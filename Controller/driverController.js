const asyncHandler = require("express-async-handler");
const Driver = require("../models/driver");

exports.driver_list = asyncHandler(async (req, res, next) => {
  const AllDrivers = await Driver.find().sort({ name: 1 }).exec();
  res.render("driver_list", {
    driver_list: AllDrivers,
    title: "F1 Drivers",
  });
});
