const mongoose = require("mongoose");
const schema = require("../schema/user");

const document = mongoose.Schema(schema);

module.exports = mongoose.model('user', document);