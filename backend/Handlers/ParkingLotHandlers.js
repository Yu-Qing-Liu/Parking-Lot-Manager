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

        //@Todo Forward geocode on parking lot location
        

        // Create the parking lot
        await db2.collection("ParkingLotsData").insertOne(
            {
                _id:parkingLotId,
                country:country,
                city:city,
                address:address,
                //@Todo: coords:coords,
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

//Fetches all the parking lots that a user owns
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

// Edits a Parking lot, takes a parkingLot uid and updates a parking lot
const updateParkingLot = async(req,res) => {
    const uid = req.params.uid;
    const db = client.db("ParkingLots");
    let address = req.body.address;
    let city = req.body.city;
    let country = req.body.country;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let days = req.body.days;
    let price = parseFloat(req.body.price).toFixed(2);

    let daysValues = Object.values(days);
    let daysKeys = Object.keys(days);
    let availableDays = []
    daysValues.forEach((bool,index) => {
        if(bool) {
            availableDays.push(daysKeys[index]);
        }
    })

    //Verify information
    if(req.body.price !== "" && price.toString() === "NaN") {
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

    let data = [{address:address},{city:city},{country:country},{startTime:startTime},{endTime:endTime},{days:availableDays},{price:price}];
    //Filter out what needs to be updated
    let updates = [];
    data.forEach((dataObj) => {
        if(Object.values(dataObj).toString() !== "" && Object.values(dataObj).toString() !== "NaN") {
            console.log(Object.values(dataObj).toString());
            updates.push(dataObj);
        }
    })

    try {
        await client.connect();

        //@Todo: Update parking lot's coordinates if required
        if(address !== "" || city !== "" || country !== "") {
            //@Todo: Forward geocode
        }

        await db.collection("ParkingLotsData").updateOne(
            {_id:uid},
            {$set: {/*@Todo update coords in db*/}}
        )

        //Loop through updates and perform updates
        for(let i = 0; i < updates.length; i++) {
            await db.collection("ParkingLotsData").updateOne(
                {_id:uid},
                {$set: updates[i]}
            )
        }
        res.status(200).json({status:"success"});
        client.close();
    } catch (err) {
        client.close();
        res.status(400).json({status:"error", error:err.message});
    }
}

//Deletes a parking lot by uid
const deleteParkingLot = async(req,res) => {
    const uid = req.params.uid;
    const userId = req.body.uid;
    const db1 = client.db("ParkingLots");
    const db2 = client.db("Users");
    try {
        await client.connect();
        //Check if parking lot exists
        const parkingLot = await db1.collection("ParkingLotsData").findOne({_id:uid});
        console.log(parkingLot);
        if(parkingLot === null) {
            throw new Error("The parking lot does not exist");
        }
        //Delete the parking lot
        await db1.collection("ParkingLotsData").deleteOne({_id:uid});
        //Update User's ParkingLot Id's
        await db2.collection("UserData").updateOne(
            {_id:userId},
            {$pull: {
                parkingLotId:{$in:[uid]},
            }},
        );
        client.close();
        res.status(200).json({status:"success"})
    } catch (err) {
        client.close();
        res.status(400).json({status:"error", error:err.message})
    }
}

module.exports = {
    createParkingLot,
    getParkingLots,
    updateParkingLot,
    deleteParkingLot
}