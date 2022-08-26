const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {};
const client = new MongoClient(MONGO_URI, options);

// Retreives the data from one user by uid
const getUser = async (req,res) => {
    const uid = req.params.uid;
    try {
        await client.connect();
        const db = client.db("Users");
        const userData = await db.collection("UserData").findOne({_id:uid});
        res.status(200).json({status:"success", userData});
        client.close();
    } catch (err) {
        client.close();
        res.status(400).json({status:"error", error:err.message});
    }
}



module.exports = {
    getUser,
}