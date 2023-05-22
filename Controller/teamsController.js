const asyncHandler = require("express-async-handler");
const Teams = require("../models/team");

exports.index = asyncHandler(async (req, res, next) => {
  const allTeams = await Teams.find().sort({ name: 1 }).exec();
  res.render("index", {
    title: "Formula 1",
    teams_list: allTeams,
  });
});

exports.teams_list = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: Team Page ");
});
