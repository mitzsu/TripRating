const mongoose = require("mongoose");
const schema = require("../schema/trip");

const document = mongoose.Schema(schema);

module.exports = mongoose.model('trip', document);