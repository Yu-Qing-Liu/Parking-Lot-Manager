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

// Gets all the existing users
const getAllUsers = async (req,res) => {
    try {
        //Get All the users from firebase
        const users = await admin.auth().listUsers(10);
        res.status(200).json({status:"success", users});
    } catch (err) {
        res.status(400).json({status:"error", error: err.message});
    }
}

// Updates a user's personal info by uid
const updateUser = async (req,res) => {
    const uid = req.params.uid;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let city = req.body.city;
    let postalCode = req.body.postalCode;
    let country = req.body.country;

    //Verifying information
    if(!email.includes("@") && email !== "") {
        client.close();
        res.status(400).json({status:"error", error:"Invalid Email Address"});
        return;
    }
    if(phoneNumber.length !== 12 && phoneNumber !== "") {
        client.close();
        res.status(400).json({status:"error", error:"Invalid Phone Number Please follow the required format"});
        return;
    }
    if(phoneNumber !== "") {
        try {
            phoneNumber = phoneNumber.match(/[0-9]{3}-[0-9]{3}-[0-9]{4}/).toString();
        } catch (err) {
            client.close();
            res.status(400).json({status:"error", error:"Invalid Phone Number Please follow the required format"});
            return;
        }
    }

    const data = [];
    data.push({email:email});
    data.push({phoneNumber:phoneNumber});
    data.push({firstName:firstName});
    data.push({lastName:lastName});
    data.push({address:address});
    data.push({city:city});
    data.push({postalCode:postalCode});
    data.push({country:country});

    try {
        //Update user on firebase
        if(email !== "") {
            await admin.auth().updateUser(uid, {
                email: email,
            })
        }
        //Update mongo
        await client.connect();
        const db = client.db("Users");

        const updates = [];

        data.forEach((obj) => {
            if(Object.values(obj)[0] !== "") {
                updates.push(obj);
            }
        })
        
        
        for(let i = 0; i < updates.length; i++) {
            await db.collection("UserData").updateOne(
                {_id:uid},
                {$set: updates[i]}
            );
        }
        
        client.close();
        res.status(200).json({status:"success"});
    } catch (err) {
        client.close();
        res.status(400).json({status:"error", error: err.message});
    }

}

// Deletes a User
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
    updateUser,
}