const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: String,
    message: String,
});

module.exports = mongoose.model('Comment', schema);