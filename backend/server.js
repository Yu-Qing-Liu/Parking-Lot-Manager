"use strict";

const express = require('express');
const morgan = require("morgan");
const app = express();

const {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,
} = require("./Handlers/AuthentificationHandlers");

const {
    getUser,
} = require("./Handlers/AccountHandlers");

const {
    createParkingLot,
    getParkingLots,
} = require("./Handlers/ParkingLotHandlers");

app.use(morgan("tiny"))
app.use(express.json())
app.use(express.static("public"))

/*------------------------*/
/*↓↓↓ Endpoints ↓↓↓*/ 

//Login And Authentification endpoints
app.post("/createUser", createUser);
//Get all existing accounts
app.get("/getAllUsers", getAllUsers);
//Delete a user by uid
app.delete("/deleteUser/:uid", deleteUser);

//AccountManagement endpoints
app.get("/getUser/:uid", getUser);
app.patch("/updateUser/:uid", updateUser);

//ParkingLotManagement endpoints
app.post("/createParkingLot/:uid", createParkingLot);
app.get("/getParkingLots/:uid", getParkingLots);

/*↑↑↑ Endpoints ↑↑↑*/ 
/*------------------------*/
app.get("*", (req,res) => {
    res.status(404).json({
        status:404,
        message: "This is obviously not what you are looking for",
    });
})

app.listen(8000);