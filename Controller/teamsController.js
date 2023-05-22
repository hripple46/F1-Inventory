const asyncHandler = require("express-async-handler");
const Teams = require("../models/team");
const TeamPrincipal = require("../models/teamPrincipal");

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
  res.render("team_details", {
    title: team.name,
    teamprinc: teamprincipal,
  });
});
