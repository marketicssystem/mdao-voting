const mongoose = require("mongoose");

const Proposal = mongoose.model(
  "Proposal",
  new mongoose.Schema({
    yesVoteCount: Number,
    noVoteCount: Number,
    title: String,
    description: String,
    closed: Boolean,
    voters: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ]
  })
);

module.exports = Proposal;