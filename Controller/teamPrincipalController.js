const asyncHandler = require("express-async-handler");
const TeamPrincipals = require("../models/teamPrincipal");

exports.teamprincipal_list = asyncHandler(async (req, res, next) => {
  const teamPrincipal_List = await TeamPrincipals.find()
    .sort({ name: 1 })
    .exec();
  res.render("teamPrincipal_List", {
    teamPrincipal_List: teamPrincipal_List,
    title: "Team Principals",
  });
});

exports.teamPrincipal_details = asyncHandler(async (req, res, next) => {
  res.send("Team Principal Details not implemented");
});
