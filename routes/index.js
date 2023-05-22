var express = require("express");
var router = express.Router();
const teams_controller = require("../Controller/teamsController");
const teamPrincipal_controller = require("../Controller/teamPrincipalController");
const car_controller = require("../Controller/carController");
const driver_controller = require("../Controller/driverController");

/* GET home page. */
router.get("/", teams_controller.index);

router.get("/team/:id", teams_controller.teams_details);

router.get("/teamprincipal", teamPrincipal_controller.teamprincipal_list);

router.get("/car", car_controller.car_list);

router.get("/driver", driver_controller.driver_list);

module.exports = router;
