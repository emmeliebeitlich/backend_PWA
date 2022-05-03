const express = require('express');
const mongoose = require('mongoose');
const Grid = require("gridfs-stream");
const router = express.Router();

const connect = mongoose.createConnection('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;
connect.once('open', () => {
    gfs = Grid(connect.db, mongoose.mongo);
    gfs.collection('fileupload');
});

router.delete('/:filename', async(req, res) => {
    try {
        await gfs.collection('fileupload').deleteOne({ filename: req.params.filename });
        res.send({
            "message": "deleted"
        });
    } catch (error) {
        console.log('error', error);
        res.send("An error occured.");
    }
});

module.exports = router;