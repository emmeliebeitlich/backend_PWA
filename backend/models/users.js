const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: String,
    password: String,
    pictureId: String,
});

module.exports = mongoose.model('User', schema);