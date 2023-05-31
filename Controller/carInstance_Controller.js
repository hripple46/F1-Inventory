const Car = require("../models/car");
const CarInstance = require("../models/carInstance");

exports.carInstance_update_get = async (req, res, next) => {
  const carInstance = await CarInstance.findById(req.params.id);
  res.render("carInstance_form", {
    title: "Update Car Instance",
    carInstance: carInstance,
  });
};
