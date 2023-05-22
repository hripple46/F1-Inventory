const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamPrincipalSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: false },
});

TeamPrincipalSchema.virtual("url").get(function () {
  return `/teamprincipal/${this._id}`;
});

module.exports = mongoose.model("TeamPrincipal", TeamPrincipalSchema);
