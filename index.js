// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
//const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://newUser:1998@cluster0.lohf1.mongodb.net/contactsDB?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("contactsDB").collection("contacts");
//   // perform actions on the collection object
//   client.close();
// });
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// var db = mongoose.connection;
var db = mongoose.connection

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});