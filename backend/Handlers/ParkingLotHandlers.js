const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {};
const client = new MongoClient(MONGO_URI, options);

// Creates a Parking lot, takes the user's uid and links a parking lot to them
const createParkingLot = async (req,res) => {
    const userId = req.params.uid;
    let country = req.body.country;
    let city = req.body.city;
    let address = req.body.address;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let days = req.body.days;
    let price = parseFloat(req.body.price).toFixed(2);
    const parkingLotId = uuidv4();
    const db1 = client.db("Users");
    const db2 = client.db("ParkingLots");

    let daysValues = Object.values(days);
    let daysKeys = Object.keys(days);
    let availableDays = []
    daysValues.forEach((bool,index) => {
        if(bool) {
            availableDays.push(daysKeys[index]);
        }
    })

    //Verify some information
    console.log(typeof price);
    console.log(price.toString());
    if(price.toString() === "NaN") {
        res.status(400).json({status:"error", error:"Please enter a valid amount for the price"})
        return;
    }
    if(availableDays.length === 0) {
        res.status(400).json({status:"error", error:"Please select a day to host your parking lot"})
        return;
    }
    if(startTime === endTime) {
        res.status(400).json({status:"error", error:"Please select a valid time frame to host your parking lot"})
        return;
    }
    if(country === "Not set yet" || city === "Not set yet" || address === "Not set yet") {
        res.status(400).json({status:"error", error:"Please enter a valid parking lot location"})
        return;
    }

    try {
        await client.connect();
        // Create the parking lot
        await db2.collection("ParkingLotsData").insertOne(
            {
                _id:parkingLotId,
                country:country,
                city:city,
                address:address,
                startTime:startTime,
                endTime:endTime,
                days:availableDays,
                price:price,
            }
        )
        // Link the parkingLotId to the user
        await db1.collection("UserData").updateOne(
            {_id:userId},
            {$push: {parkingLotId:parkingLotId}},
        );
        res.status(200).json({status:"success"});
        client.close();
    } catch (err) {
        client.close();
        res.status(400).json({status:"error", error:err.message});
    }
}

//Fetches all the parking lots that A user owns
const getParkingLots = async(req,res) => {
    const uid = req.params.uid;
    const db1 = client.db("Users");
    const db2 = client.db("ParkingLots");
    try {
        await client.connect();
        //Fetch the parking lots Id's
        const userData = await db1.collection("UserData").findOne({_id:uid})
        let parkingLotIds = userData.parkingLotId;
        let parkingLotObjects = [];
        //Fetch the parking lots
        for(let i = 0; i < parkingLotIds.length; i++) {
            let parkingLotObject = await db2.collection("ParkingLotsData").findOne({_id:parkingLotIds[i]});
            parkingLotObjects.push(parkingLotObject);
        }
        
        res.status(200).json({status:"success", data:parkingLotObjects});
        client.close();
    } catch (err) {
        client.close();
        res.status(400).json({status:"error", error:err.message});
    }
}

module.exports = {
    createParkingLot,
    getParkingLots,
}