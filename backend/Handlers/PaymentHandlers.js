const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {};
const client = new MongoClient(MONGO_URI, options);

// Generates a ticket when a payment is proccessed
const generateTicket = async (req,res) => {
    const ticketId = uuidv4();
    const appointment = req.body.appointment;
    const price = req.body.price;
    const ownerId = req.body.userId;
    const address = req.body.address;
    const db = client.db("Tickets");
    try {
        await client.connect();
        await db.collection("TicketsData").insertOne({
            _id:ticketId,
            ...appointment,
            address:address,
            price:price,
            ownerId:ownerId,
        });
        client.close();
        res.status(200).json({status:"success", uid:ticketId})
    } catch (err) {
        client.close();
        res.status(400).json({status:"error", error:err.message})
    }
}

// Retreives a ticket by uid
const getTicket = async(req,res) => {
    const uid = req.params.uid;
    const db = client.db("Tickets");
    try {
        await client.connect();
        const ticket = await db.collection("TicketsData").findOne({_id:uid});
        res.status(200).json({status:"success", ticket});
        client.close();
    } catch (err) {
        client.close();
        res.status(400).json({status:"error", error:err.message});
    }
}

module.exports = {
    generateTicket,
    getTicket,
}