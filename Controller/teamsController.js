const asyncHandler = require("express-async-handler");
const Teams = require("../models/team");
const TeamPrincipal = require("../models/teamPrincipal");
const Driver = require("../models/driver");
const Car = require("../models/car");

exports.index = asyncHandler(async (req, res, next) => {
  const allTeams = await Teams.find().sort({ name: 1 }).exec();
  res.render("index", {
    title: "Formula 1",
    teams_list: allTeams,
  });
});

exports.teams_details = asyncHandler(async (req, res, next) => {
  const team = await Teams.findById(req.params.id);
  const teamprincipal = await TeamPrincipal.findById(team.teamprincipal);
  const drivers = await team.drivers;
  const car = await Car.findById(team.car);
  const driver_list = [];
  for (let driver of drivers) {
    const teamDriver = await Driver.findById(driver);
    driver_list.push(teamDriver);
  }
  res.render("team_details", {
    title: team.name,
    teamprinc: teamprincipal,
    driver_list: driver_list,
    team_car: car,
  });
});
