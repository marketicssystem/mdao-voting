const dbConfig = require("../config/db.config.js");

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.proposals = require("./proposal.model.js")(mongoose);

db.user = require("./user.model");
db.role = require("./role.model");
db.proposal = require("./proposal.model")
db.refreshToken = require("./refreshToken.model");

db.ROLES = ["voter", "admin"];

module.exports = db;