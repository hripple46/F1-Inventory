const asyncHandler = require("express-async-handler");
const Car = require("../models/car");
const CarInstance = require("../models/carInstance");

exports.car_list = asyncHandler(async (req, res, next) => {
  const allCars = await Car.find().sort({ name: 1 }).exec();
  res.render("car_list", {
    title: "Car List",
    car_list: allCars,
  });
});

exports.car_details = asyncHandler(async (req, res, next) => {
  const car = await Car.findById(req.params.id);
  const carInstances = car.instances;
  const carInstance_list = [];
  for (let carInstance of carInstances) {
    const instance = await CarInstance.findById(carInstance);
    carInstance_list.push(instance);
  }
  res.render("car_details", {
    title: car.name,
    carInstance_list: carInstance_list,
  });
});

exports.car_create_get = asyncHandler(async (req, res, next) => {
  res.render("car_form", { title: "Create Car" });
});
exports.car_create_post = asyncHandler(async (req, res, next) => {
  const car = new Car({
    name: req.body.carName,
  });
  const checkForDuplicate = await Car.findOne({ name: req.body.carName });
  if (checkForDuplicate) {
    res.redirect(checkForDuplicate.url);
  } else {
    await car.save();
    res.redirect(car.url);
  }
});
exports.car_delete_get = asyncHandler(async (req, res, next) => {
  const car = await Car.findById(req.params.carid);
  res.render("car_delete", { title: car.name, car: car });
});
exports.car_delete_post = asyncHandler(async (req, res, next) => {
  await Car.findByIdAndRemove(req.params.carid);
  res.redirect("/car");
});
