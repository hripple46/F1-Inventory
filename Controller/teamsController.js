const asyncHandler = require("express-async-handler");
const Teams = require("../models/team");
const TeamPrincipal = require("../models/teamPrincipal");
const Driver = require("../models/driver");
const Car = require("../models/car");

exports.teams_list = asyncHandler(async (req, res, next) => {
  const allTeams = await Teams.find().sort({ name: 1 }).exec();
  res.render("teams_list", {
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
    console.log("Driver: " + driver);
    driver_list.push(teamDriver);
  }
  console.log("Driver List: " + driver_list);
  res.render("team_details", {
    title: team.name,
    teamprinc: teamprincipal,
    driver_list: driver_list,
    team_car: car,
    team_url: team.url,
  });
});

exports.teams_create_get = asyncHandler(async (req, res, next) => {
  res.render("teams_form");
});

exports.teams_create_post = asyncHandler(async (req, res, next) => {
  const team = new Teams({
    name: req.body.teamname,
  });
  const isTeamsExist = await Teams.findOne({ name: req.body.teamname }).exec();
  if (isTeamsExist) {
    res.redirect(isTeamsExist.url);
  } else {
    await team.save();
    res.redirect(team.url);
  }
});

exports.teams_delete_get = asyncHandler(async (req, res, next) => {
  const team = await Teams.findById(req.params.id).exec();
  res.render("teams_delete", { team: team });
});

exports.teams_delete_post = asyncHandler(async (req, res, next) => {
  await Teams.findByIdAndDelete(req.body.teamsid);
  res.redirect("/teams");
});
