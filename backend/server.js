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
    enableParkingLot,
    disableParkingLot,
    getAllParkingLots,
    addAppointment,
} = require("./Handlers/ParkingLotHandlers");

const {
    generateTicket,
    getTicket,
    checkoutTicket,
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
app.patch("/enableParkingLot/:uid", enableParkingLot);
app.patch("/disableParkingLot/:uid", disableParkingLot);
app.get("/getAllParkingLots", getAllParkingLots);
app.post("/addAppointment/:uid", addAppointment);

//Payment and ticket system endpoints
app.post("/generateTicket", generateTicket);
app.get("/getTicket/:uid", getTicket);
app.delete("/checkoutTicket/:uid", checkoutTicket);

/*↑↑↑ Endpoints ↑↑↑*/ 
/*------------------------*/
app.get("*", (req,res) => {
    res.status(404).json({
        status:404,
        message: "This is obviously not what you are looking for",
    });
})

app.listen(8000);