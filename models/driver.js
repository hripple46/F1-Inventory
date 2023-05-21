const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
});

DriverSchema.virtual("url").get(function () {
  return `/driver/${this._id}`;
});

module.exports = mongoose.model("Driver", DriverSchema);
