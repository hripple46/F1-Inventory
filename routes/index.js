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

router.get(
  "/teamprincipal/:id",
  teamPrincipal_controller.teamPrincipal_details
);

router.get("/car", car_controller.car_list);

router.get("/driver", driver_controller.driver_list);

router.get("/driver/:id", driver_controller.driver_details);

module.exports = router;
