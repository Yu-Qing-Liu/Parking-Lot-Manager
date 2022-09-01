"use strict";

const express = require('express');
const morgan = require("morgan");
const app = express();

const {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,
    getUser,
} = require("./Handlers/AuthentificationHandlers");

const {
    createParkingLot,
    getParkingLots,
    updateParkingLot,
    deleteParkingLot,
    getAllParkingLots,
    addAppointment,
} = require("./Handlers/ParkingLotHandlers");

const {
    
} = require("./Handlers/PaymentHandlers");

app.use(morgan("tiny"))
app.use(express.json())
app.use(express.static("public"))

/*------------------------*/
/*↓↓↓ Endpoints ↓↓↓*/ 

//Login And Authentification endpoints
app.post("/createUser", createUser);
app.get("/getAllUsers", getAllUsers);
app.delete("/deleteUser/:uid", deleteUser);
app.get("/getUser/:uid", getUser);
app.patch("/updateUser/:uid", updateUser);

//ParkingLotManagement endpoints
app.post("/createParkingLot/:uid", createParkingLot);
app.get("/getParkingLots/:uid", getParkingLots);
app.patch("/updateParkingLot/:uid", updateParkingLot);
app.delete("/deleteParkingLot/:uid", deleteParkingLot);
app.get("/getAllParkingLots", getAllParkingLots);
app.post("/addAppointment/:uid", addAppointment);


/*↑↑↑ Endpoints ↑↑↑*/ 
/*------------------------*/
app.get("*", (req,res) => {
    res.status(404).json({
        status:404,
        message: "This is obviously not what you are looking for",
    });
})

app.listen(8000);