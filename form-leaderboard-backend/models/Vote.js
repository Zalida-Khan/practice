const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  formType: { type: String, required: true },
  count: { type: Number, default: 1 },
});

module.exports = mongoose.model("Vote", voteSchema);
