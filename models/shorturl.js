const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const urlSchema = new Schema({
  originalUrl: String,
  shortUrl: String,
}, {timestamp: true});

const ModelClass = mongoose.model('shorturl', urlSchema);

module.exports = ModelClass;
