var express = require("express");
var router = express.Router();
const teams_controller = require("../Controller/teamsController");

/* GET home page. */
router.get("/", teams_controller.index);

router.get("/teams", teams_controller.teams_list);

router.get("/teamprincipal", )

module.exports = router;
