const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String, required: true },
  teamprincipal: {
    type: Schema.Types.ObjectId,
    ref: "TeamPrincipal",
    required: false,
  },
  drivers: [{ type: Schema.Types.ObjectId, ref: "Driver", required: false }],
  car: { type: Schema.Types.ObjectId, ref: "Car", required: false },
});

TeamSchema.virtual("url").get(function () {
  return `/team/${this._id}`;
});

module.exports = mongoose.model("Team", TeamSchema);
