const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: { type: String, required: true },
});

CarSchema.virtual("url").get(function () {
  return `/car/${this._id}`;
});

module.exports = mongoose.model("Car", CarSchema);
