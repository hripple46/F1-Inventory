const Car = require("../models/car");
const CarInstance = require("../models/carInstance");
const asyncHandler = require("express-async-handler");

exports.carInstance_update_get = async (req, res, next) => {
  const carInstance = await CarInstance.findById(req.params.id);
  res.render("carInstance_form", {
    title: "Update Car Instance",
    carInstance: carInstance,
  });
};

exports.carInstance_update_post = asyncHandler(async (req, res, next) => {
  try {
    const carInstance = await CarInstance.findById(req.params.id);
    const car = await Car.findById(carInstance.car);
    console.log("Body" + req.body.engineStatus);
    carInstance.engineStatus = req.body.engineStatus;

    carInstance.gearboxStatus = req.body.gearboxStatus;
    carInstance.bodyWorkStatus = req.body.bodyWorkStatus;

    await carInstance.save();
    res.redirect(car.url);
  } catch (err) {
    console.log(err);
  }
});
