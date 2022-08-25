"use strict";

const { v4: uuidv4 } = require('uuid');

const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {};
const client = new MongoClient(MONGO_URI, options);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const createUser = async (req,res) => {
    let address = req.body.address
    let phoneNumber = req.body.phoneNumber
    let email = req.body.email
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword

    if(password !== confirmPassword) {
        res.status(401).json({status:"error", error:"Please make sure that both passwords match"});
    } else {
        const uid = uuidv4();
        try {
            //Create a user on firebase
            await admin.auth().createUser({
                uid:uid,
                email: email,
                password: password,
            })
            //Push userData to mongoDb
            await client.connect();
            const db = client.db("Users");
            await db.collection("UserData").insertOne({
                _id:uid,
                email:email,
                phoneNumber:phoneNumber,
                firstName:"Not set yet",
                lastName:"Not set yet",
                address:address,
                city:"Not set yet",
                postalCode:"Not set yet",
                country:"Not set yet",
                parkingLotId:null,
            });
            client.close();
            res.status(200).json({
                status:"success", 
                uid
            });
        } catch (err) {
            client.close();
            res.status(400).json({status:"error", error: err.message});
        }
        
    }

}

const getAllUsers = async (req,res) => {
    try {
        //Get All the users from firebase
        const users = await admin.auth().listUsers(10);
        res.status(200).json({status:"success", users});
    } catch (err) {
        res.status(400).json({status:"error", error: err.message});
    }
}

const deleteUser = async (req,res) => {
    const uid = req.params.uid;
    try {
        //Delete a user from firebase by uid
        await admin.auth().deleteUser(uid);
        //Delete the user from mongoDB
        await client.connect();
        const db = client.db("Users");
        await db.collection("UserData").deleteOne({_id:uid});
        client.close();
        res.status(200).json({status:"success"});
    } catch (err) {
        client.close();
        res.status(400).json({status:"error", error: err.message});
    }
} 

module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
}