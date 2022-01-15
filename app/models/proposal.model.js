model.exports = mongoose => {
  var Proposal = mongoose.model(
    "Proposal",
    new mongoose.Schema({
      yesVoteCount: Number,
      noVoteCount: Number,
      title: String,
      description: String,
      published: Boolean,
      closed: Boolean,
      voters: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          }
        ],
    },
    { timestamps: true }
    )
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Proposal = mongoose.model("Proposal", schema);
  return Proposal;
};