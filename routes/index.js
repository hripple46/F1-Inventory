var express = require("express");
var router = express.Router();
const teams_controller = require("../Controller/teamsController");
const teamPrincipal_controller = require("../Controller/teamPrincipalController");
const car_controller = require("../Controller/carController");
const driver_controller = require("../Controller/driverController");
const indexController = require("../Controller/indexController");
const carInstance_Controller = require("../Controller/carInstance_Controller");

/* GET home page. */
router.get("/", indexController.index);

router.get("/teams", teams_controller.teams_list);

router.get("/teams/create", teams_controller.teams_create_get);

router.post("/teams/create", teams_controller.teams_create_post);

router.get("/team/:id/delete", teams_controller.teams_delete_get);

router.post("/team/:id/delete", teams_controller.teams_delete_post);

router.get("/team/:id", teams_controller.teams_details);

router.get("/teamprincipal", teamPrincipal_controller.teamprincipal_list);

router.get(
  "/teamprincipal/create",
  teamPrincipal_controller.teamprincipal_create_get
);

router.post(
  "/teamprincipal/create",
  teamPrincipal_controller.teamprincipal_create_post
);

router.get(
  "/teamprincipal/:id",
  teamPrincipal_controller.teamPrincipal_details
);

router.get(
  "/teamprincipal/:id/delete",
  teamPrincipal_controller.teamprincipal_delete_get
);

router.post(
  "/teamprincipal/:id/delete",
  teamPrincipal_controller.teamprincipal_delete_post
);

router.get("/car", car_controller.car_list);

router.get("/car/:id", car_controller.car_details);

router.get("/driver", driver_controller.driver_list);
router.get("/driver/create", driver_controller.driver_create_get);

router.post("/driver/create", driver_controller.driver_create_post);

router.get("/driver/:id", driver_controller.driver_details);

router.get("/driver/:id/delete", driver_controller.driver_delete_get);

router.post("/driver/:id/delete", driver_controller.driver_delete_post);

router.get("/driver/:id/update", driver_controller.driver_update_get);

router.post("/driver/:id/update", driver_controller.driver_update_post);

router.get(
  "/carinstance/:id/update",
  carInstance_Controller.carInstance_update_get
);

router.post(
  "/carinstance/:id/update",
  carInstance_Controller.carInstance_update_post
);

module.exports = router;
