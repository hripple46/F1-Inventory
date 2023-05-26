const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarInstanceSchema = new Schema({
  car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
  engineStatus: {
    type: String,
    required: true,
    enum: ["Good", "Bad", "Under Repair"],
  },
  gearboxStatus: {
    type: String,
    required: true,
    enum: ["Good", "Bad", "Under Repair"],
  },
  bodyWorkStatus: {
    type: String,
    required: true,
    enum: ["Good", "Bad", "Under Repair"],
  },
});

CarInstanceSchema.virtual("url").get(function () {
  return `/carinstance/${this._id}`;
});
module.exports = mongoose.model("CarInstance", CarInstanceSchema);
