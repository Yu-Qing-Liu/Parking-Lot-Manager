const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {};
const client = new MongoClient(MONGO_URI, options);

//Generates a ticket when a payment is proccessed
const generateTicket = async (req,res) => {
    const ticketId = uuidv4();
    const appointment = req.body.appointment;
    const db = client.db("Tickets");
    try {
        await client.connect();
        await db.collection("TicketsData").insertOne({
            _id:ticketId,
            ...appointment,
        });
        client.close();
        res.status(200).json({status:"success", uid:ticketId})
    } catch (err) {
        client.close();
        res.status(400).json({status:"error", error:err.message})
    }
}

module.exports = {
    generateTicket,

}