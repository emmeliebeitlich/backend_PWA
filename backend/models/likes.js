const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: String,
    pictureId: String,
});

module.exports = mongoose.model('Like', schema);