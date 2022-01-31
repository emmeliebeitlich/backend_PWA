const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    caption: String,
    //picture: Pic,
    geoloc: Number,
});

module.exports = mongoose.model('Post', schema);