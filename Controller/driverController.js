const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Driver = require("../models/driver");
const driver = require("../models/driver");
const Team = require("../models/team");

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

exports.driver_create_get = asyncHandler(async (req, res, next) => {
  const Teams = await Team.find().sort({ name: 1 }).exec();
  console.log("Teams: " + Teams);
  res.render("driver_form", { title: "Create Driver", teams: Teams });
});

exports.driver_create_post = [
  body("name", "Driver name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const driver = new Driver({
      name: req.body.name,
      team: req.body.driverteam,
    });
    const team = await Team.findById(req.body.driverteam);
    await team.drivers.push(driver);
    await team.save();

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

exports.driver_delete_get = asyncHandler(async (req, res, next) => {
  const driver = await Driver.findById(req.params.id);
  if (driver.team) {
    const team = await Team.findById(driver.team);
    team.drivers.pull(driver);
    await team.save();
  }
  console.log(driver.team);

  if (!driver) {
    res.redirect("/driver");
  }
  res.render("driver_delete", { title: "Delete Driver", driver });
});

exports.driver_delete_post = asyncHandler(async (req, res, next) => {
  await driver.findByIdAndRemove(req.body.driverid);
  res.redirect("/driver");
});

exports.driver_update_get = asyncHandler(async (req, res, next) => {
  const driver = await Driver.findById(req.params.id);
  const teams = await Team.find().sort({ name: 1 }).exec();
  res.render("driver_update", { title: "Update Driver", driver, teams });
});

exports.driver_update_post = [
  body("name", "Driver name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    //update the driver in the database
    const driver = await Driver.findById(req.params.id);
    //pull the driver from the old team
    console.log("Old Team: " + driver.team);
    if (driver.team) {
      const oldTeam = await Team.findById(driver.team);
      console.log("Old Team drivers before: " + oldTeam.drivers);
      oldTeam.drivers.pull(driver);
      console.log("Old Team drivers after: " + oldTeam.drivers);
      await oldTeam.save();
    }

    driver.name = req.body.name;
    driver.championships = req.body.championships;
    driver.age = req.body.age;
    driver.team = req.body.driverteam;
    const team = await Team.findById(req.body.driverteam);
    await team.drivers.push(driver);
    await team.save();
    await driver.save();
    res.redirect(driver.url);
  }),
];
