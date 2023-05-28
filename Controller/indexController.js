const asyncHandler = require("express-async-handler");
const Driver = require("../models/driver");
const Team = require("../models/team");
const TeamPrincipal = require("../models/teamPrincipal");
const Car = require("../models/car");

exports.index = asyncHandler(async (req, res, next) => {
  const drivers_count = await Driver.count();

  const teams_count = await Team.count();
  const team_principals_count = await TeamPrincipal.count();
  const cars_count = await Car.count();

  res.render("index", {
    title: "Formula 1",
    drivers_count: drivers_count,
    teams_count: teams_count,
    team_principals_count: team_principals_count,
    cars_count: cars_count,
  });
});
