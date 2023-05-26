const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: { type: String, required: true },
  instances: [{ type: Schema.Types.ObjectId, ref: "CarInstance" }],
});

CarSchema.virtual("url").get(function () {
  return `/car/${this._id}`;
});

module.exports = mongoose.model("Car", CarSchema);
