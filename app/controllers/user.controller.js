exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.voterBoard = (req, res) => {
  res.status(200).send("Voter Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
