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
