const mongoose = require('mongoose');

const SchemaPrefix = mongoose.Schema({
    _id: { type: String, require: true },
    newPrefix: { type: String, require: true }
})

const model = mongoose.model("GuildPrefix", SchemaPrefix)

module.exports = model;