const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes to Handle Request
const routes = require('./routes/routes');
const uploadRoute = require('./routes/upload.route');
const downloadRoute = require('./routes/download.route');
const deleteRoute = require('./routes/delete.route');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors()); 

// API Routes
app.use('/', routes);
app.use('/upload', uploadRoute);
app.use('/download', downloadRoute);
app.use('/delete', deleteRoute);

// connect to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected to DB');
});

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `);
    }
});