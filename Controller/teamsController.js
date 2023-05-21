const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", {
    title: "Formula 1",
  });
});

exports.teams_list = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: Team Page ");
});
