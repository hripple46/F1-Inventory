const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: false },
  championships: { type: Number, required: false },
  team: { type: Schema.Types.ObjectId, ref: "Team", required: false },
});

DriverSchema.virtual("url").get(function () {
  return `/driver/${this._id}`;
});

module.exports = mongoose.model("Driver", DriverSchema);
