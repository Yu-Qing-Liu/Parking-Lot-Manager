const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {};
const client = new MongoClient(MONGO_URI, options);

const moment = require('moment');
const cron = require('node-cron');

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
const getTicket = async (req,res) => {
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

// Checks out a ticket by uid
const checkoutTicket = async (req,res) => {
    const uid = req.params.uid;
    const db1 = client.db("Tickets");
    const db2 = client.db("Users");
    try {
        await client.connect();
        // Find the ticket
        const ticket = await db1.collection("TicketsData").findOne({_id:uid});
        if(ticket === null) {
            throw new Error("Sorry, this ticket is invalid");
        }
        // Pay the user
        const price = ticket.price;
        const ownerId = ticket.ownerId;

        const owner = await db2.collection("UserData").findOne({_id:ownerId});
        if(owner === null) {
            throw new Error("Internal error, owner not found, please contact support.");
        }
        let balance = parseFloat(owner.balance) + parseFloat(price);
        await db2.collection("UserData").updateOne(
            {_id:ownerId},
            {$set: {balance:balance.toFixed(2)}}
        )
        // Delete the ticket
        await db1.collection("TicketsData").deleteOne({_id:uid});
        res.status(200).json({status:"success"});
        client.close();
    } catch (err) {
        client.close();
        res.status(400).json({status:"error", error:err.message});
    }
}

// Cron task to checkout all tickets past 3 days old

module.exports = {
    generateTicket,
    getTicket,
    checkoutTicket,
}