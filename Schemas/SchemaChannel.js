const mongoose = require('mongoose');

const SchemaChannel = mongoose.Schema({
    _id: { type: String, require: true },
    IDChannel: { type: String, require: true }
})

const model = mongoose.model("GuildChannel", SchemaChannel)

module.exports = model;