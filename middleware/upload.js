const multer = require("multer");
const {
    GridFsStorage
} = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            console.log('file.mimetype === -1')
            return `${Date.now()}-${file.originalname}`;
        }
        console.log('store');
        return {
            bucketName: 'fileupload',
            filename: `${Date.now()}-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });