// Environment variables
/////////////////////////////////////////////////////////////////////
var port  = process.env.PORT || 3085;
var dburi = "mongodb://donor:donate1@ds143262.mlab.com:43262/donateforkerala" || "mongodb://localhost/donateforkerala";

// Require or import node modules
/////////////////////////////////////////////////////////////////////
// Express for making apps restful api
var express       = require("express");
// Body Parser for parsing form data which is available in req.body property
var bodyParser    = require("body-parser");
// Request for making http and https calls from api
var request       = require("request");
// Mongoose or MongoDB object modeling tool
var mongoose      = require("mongoose");
// Reference to express module to build api
var app        = express();

// Require models
/////////////////////////////////////////////////////////////////////
// Donor model
var Donor = require("./models/Donor.model");

// Mongoose configuration
/////////////////////////////////////////////////////////////////////
// Use bluebird as promise library for mongoose
mongoose.Promise = require('bluebird');
// Connect to database
mongoose.connect(dburi, {useNewUrlParser: true});

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
app.use(bodyParser.urlencoded({extended: true}));

// Array to store coins info
/////////////////////////////////////////////////////////////////////
const coins = [
    {
        name: "DASH",
        fullname: "Dash",
        image: "/form-img.png",
        address: "XakKySKC4LhJB92hZhQDCXsHiLexCDvsgo",
        qr: "/qr/dash.png"
    },
    {
        name: "ONION",
        fullname: "DeepOnion",
        image: "/form-img.png",
        address: "DUYBfYuE7DqsNdkoTpQsNtctPe4W9w6jpq",
        qr: "/qr/onion.png"
    },
    {
        name: "DGB",
        fullname: "Digibyte",
        image: "/form-img.png",
        address: "D5CagSbwQ3NzZCciSQ5YtmM6m8oZVFvBMj",
        qr: "/qr/dgb.png"
    },
    {
        name: "DOGE",
        fullname: "Dogecoin",
        image: "/form-img.png",
        address: "6JMBmYdSQmokNya9YbWQrVJF7aTsxM3xxsQjkzpSNkVHEyEw52Q",
        qr: "/qr/doge.png"
    },
    {
        name: "NEO",
        fullname: "Neo",
        image: "/form-img.png",
        address: "ARvyqJ1XWTaEoH5M7WkXnLGf8giJ4wxfuv",
        qr: "/qr/neo.png"
    },
    {
        name: "XRP",
        fullname: "Ripple",
        image: "/form-img.png",
        address: "rpR86W3H1CQNJDTZmozTJftPHyM81A5UbU",
        qr: "/qr/xrp.png"
    },
    {
        name: "ZEC",
        fullname: "Zcash",
        image: "/form-img.png",
        address: "5J2rUbAUr1WxLN8zMCtSEsK1e9zLTDmhMhHWSWBYZ6HeSGSiPUy",
        qr: "/qr/zec.png"
    }
];

// App routes
/////////////////////////////////////////////////////////////////////
// Root route for landing page
app.get("/", function(req, res){
    res.render("home");
});
// Route to donation form
app.get("/form", function(req, res){
    res.render("form");
});
// Route to create donor
app.post("/form", function(req, res){
    // Find donor by email
    Donor.findOne({email: req.body.email}, function(err, donor){
        if(err){ // If error
            // Log the error
            console.log(err);
        } else if(donor){ // Donor found
            // Redirect with its id to show availabe coins
            res.redirect("/form/currency/"+donor._id);
        } else { // No dodnor found
            // Create donor
            Donor.create({name: req.body.name, email: req.body.email}, function(err, newdonor){
                if(err){ // If error
                    // Log the error
                    console.log(err);
                } else { // donor created
                    // Redirect with its id to show availabe coins
                    res.redirect("/form/currency/"+newdonor._id);
                }
            });
        }
    });
});
// Route to show availabe coins
app.get("/form/currency/:donorid", function(req, res){
    res.render("form-coin", {donorid: req.params.donorid, coins: coins});
});
// Route to post coin name
app.post("/form/currency/:donorid", function(req, res){
    res.redirect("/form/currency/"+req.params.donorid+"/"+req.body.coin);
});
// Route to show coin info for payement
app.get("/form/currency/:donorid/:coin", function(req, res){
    // Search for coin info in coins array
    var info = coins.find(coin=>coin.name===req.params.coin);
    res.render("form-address", {coin: info, donorid: req.params.donorid});
});
// Route to go back to form
app.get("/form/:donorid", function(req, res){
    // Find donor
    Donor.findById(req.params.donorid, function(err, donor){
        if(err){ // If error
            // Log the error
            console.log(err);
        } else { // Donor found
            res.render("form-back", {name: donor.name, email: donor.email});
        }
    });
});

// Host server on port
/////////////////////////////////////////////////////////////////////
app.listen(port, function(){
    // Log the success message
	console.log("Server started...");
});