var express = require("express");
const router = express.Router();
const teams_controller = require("../Controller/teamsController");

/* GET home page. */
router.get("/", teams_controller.index);

module.exports = router;
