"use strict";

const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const createUser = async (req,res) => {
    await admin.auth().createUser({
        email: "Test@mail.com",
        password: "abcedf",
    })
    res.status(200).json({status:"success"});
}  

module.exports = {
    createUser
}