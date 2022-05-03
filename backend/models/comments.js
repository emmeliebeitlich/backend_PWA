const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: String,
    message: String,
    pictureId: String,
});

module.exports = mongoose.model('Comment', schema);