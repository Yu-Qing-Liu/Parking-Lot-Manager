const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {};
const client = new MongoClient(MONGO_URI, options);

const getUserInformation = () => {
    
}