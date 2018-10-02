// Require or import node modules
/////////////////////////////////////////////////////////////////////
// Express for making apps restful api
const express = require("express");
// Body Parser for parsing form data which is available in req.body property
const bodyParser = require("body-parser");
// Request for making http and https calls from api
const request = require("request");
// Mongoose or MongoDB object modeling tool
const mongoose = require("mongoose");
// Reference to express module to build api
const app = express();

// Require models
/////////////////////////////////////////////////////////////////////
// Donor model
const Donor = require("./models/Donor.model");
const config = require('./config');
// Mongoose configuration
/////////////////////////////////////////////////////////////////////
// Use bluebird as promise library for mongoose
mongoose.Promise = require('bluebird');
// Connect to database
mongoose.connect(config.db.uri, { useNewUrlParser: true });

// Change express default variables
/////////////////////////////////////////////////////////////////////
// Set path of views directory
app.set("views", "./views");
// Set template engine
app.set("view engine", "ejs");

// Add functions to express middleware
/////////////////////////////////////////////////////////////////////
// Use public directory for static files
app.use(express.static("public"));
// Use urlencoded parsing
app.use(bodyParser.urlencoded({ extended: true }));

// App routes
/////////////////////////////////////////////////////////////////////
// Root route for landing page
app.get("/", function (req, res) {
    res.render("home");
});
app.post("/addtodb", function (req, res) {
    var donor = {
        name: req.body.name,
        email: req.body.email
    }
    Donor.create(donor, function (err, newdonor) {
        if (err) {
            console.log(err);
        } else {
            res.json(newdonor);
        }
    });
});

// Host server on port
/////////////////////////////////////////////////////////////////////
app.listen(config.express.port, config.express.ip, () => {
    // Log the success message
    console.log(`Server started on port ${config.express.port}...`);
});