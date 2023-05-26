const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Driver = require("../models/driver");

exports.driver_list = asyncHandler(async (req, res, next) => {
  const AllDrivers = await Driver.find().sort({ name: 1 }).exec();
  res.render("driver_list", {
    driver_list: AllDrivers,
    title: "F1 Drivers",
  });
});

exports.driver_details = asyncHandler(async (req, res, next) => {
  const Driver_Details = await Driver.findById(req.params.id).exec();
  res.render("driver_details", {
    driver_details: Driver_Details,
  });
});

exports.driver_create_get = (req, res, next) => {
  res.render("driver_form", { title: "Create Driver" });
};

exports.driver_create_post = [
  body("name", "Driver name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const driver = new Driver({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("driver_form", {
        title: "Create Driver",
        driver,
        errors: errors.array(),
      });
      return;
    } else {
      const driverExists = await Driver.findOne({ name: req.body.name }).exec();
      if (driverExists) {
        res.redirect(driverExists.url);
      } else {
        await driver.save();
        res.redirect(driver.url);
      }
    }
  }),
];
