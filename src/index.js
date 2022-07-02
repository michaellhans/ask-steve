require("dotenv").config();

const mongoose = require('mongoose');
const express = require("express");
const viewEngine = require("./config/viewEngine");
const initWebRoute = require("./routes/web");
const bodyParser = require("body-parser");
// const connectDB = require("./database/index");

let app = express()

// Config view engine
viewEngine(app);

// Config the MongoDB
mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => {
        console.log("Successfully connect to database!");
    }).catch(err => {
        console.log(process.env.MONGODB_URI);
        console.log("Can't connect to the database");
        console.log(err);
    });

// Use body parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Init all web routes
initWebRoute(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('App is running at the port ' + port);
});