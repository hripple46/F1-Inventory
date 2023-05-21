const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamPrincipalSchema = new Schema({
  name: { type: String, required: true },

  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
});

TeamPrincipalSchema.virtual("url").get(function () {
  return `/teamprincipal/${this._id}`;
});

module.exports = mongoose.model("TeamPrincipal", TeamPrincipalSchema);
