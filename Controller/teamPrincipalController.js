const asyncHandler = require("express-async-handler");
const TeamPrincipals = require("../models/teamPrincipal");
const Team = require("../models/team");
const { body, validationResult } = require("express-validator");
const team = require("../models/team");

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
  const teamPrincipal = await TeamPrincipals.findById(req.params.id);
  const team = await Team.findById(teamPrincipal.team);
  res.render("teamprincipal_details", {
    teamprincipal_details: teamPrincipal,
    team: team,
  });
});

exports.teamprincipal_create_get = asyncHandler(async (req, res, next) => {
  const Teams = await Team.find().sort({ name: 1 }).exec();

  res.render("teamprincipal_form", { title: "Create Team Principal", Teams });
});

exports.teamprincipal_create_post = [
  body("name", "Driver name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const teamPrincipal = new TeamPrincipals({
      name: req.body.name,
      team: req.body.teamprincipalteam,
    });
    const team = await Team.findById(req.body.teamprincipalteam);
    await team.drivers.push(teamPrincipal);
    await team.save();

    if (!errors.isEmpty()) {
      res.render("teamprincipal_form", {
        title: "Create Team Principal",
        teamPrincipal,
        errors: errors.array(),
      });
      return;
    } else {
      const teamPrincipalExists = await TeamPrincipals.findOne({
        name: req.body.name,
      }).exec();
      if (teamPrincipalExists) {
        res.redirect(teamPrincipalExists.url);
      } else {
        await teamPrincipal.save();
        res.redirect(teamPrincipal.url);
      }
    }
  }),
];

exports.teamprincipal_delete_get = asyncHandler(async (req, res, next) => {
  const teamPrincipal = await TeamPrincipals.findById(req.params.id);
  res.render("teamprincipal_delete", {
    title: "Delete Team Principal",
    teamPrincipal,
  });
});

exports.teamprincipal_delete_post = asyncHandler(async (req, res, next) => {
  //delete team principal document

  await TeamPrincipals.findByIdAndDelete(req.body.teamprincipalid);
  res.redirect("teamPrincipal_list");
});

exports.teamprincipal_update_get = asyncHandler(async (req, res, next) => {
  const teamPrincipal = await TeamPrincipals.findById(req.params.id);
  const Teams = await Team.find().sort({ name: 1 }).exec();
  res.render("teamprincipal_update", {
    title: "Update Team Principal",
    teamPrincipal,
    teams: Teams,
  });
});

//post update
exports.teamprincipal_update_post = [
  body("name", "Driver name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    //pull team principal from team

    const teamPrincipal = TeamPrincipals.findById(req.params.id);
    const oldTeam = Team.findById(teamPrincipal.team);
    console.log("Team :" + teamPrincipal.team);

    await oldTeam.teamprincipal.pull(teamPrincipal);
    console.log("Old Team After Pull" + oldTeam.teamprincipal);
    await oldTeam.save();

    teamPrincipal.name = req.body.name;
    teamPrincipal.team = req.body.teamprincipalteam;
    teamPrincipal.age = req.body.age;
    teamPrincipal.save();
    //push team principal to new team
    const newTeam = Team.findById(req.body.teamprincipalteam);
    await newTeam.drivers.push(teamPrincipal);
    await newTeam.save();
  }),
];
