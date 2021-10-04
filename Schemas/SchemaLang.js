const mongoose = require('mongoose');

const SchemaLang = mongoose.Schema({
    _id: { type: String, require: true },
    newLang: { type: String, require: true }
})

const model = mongoose.model("GuildLang", SchemaLang)

module.exports = model;