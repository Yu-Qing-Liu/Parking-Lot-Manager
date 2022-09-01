const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {};
const client = new MongoClient(MONGO_URI, options);

//Generates a ticket when a payment is proccessed