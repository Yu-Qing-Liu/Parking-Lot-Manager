"use strict";

const express = require('express');
const morgan = require("morgan");
const app = express();

const {
    createUser
} = require("./Handlers/AuthentificationHandlers");

app.use(morgan("tiny"))
app.use(express.json())
app.use(express.static("public"))

/*------------------------*/
/*↓↓↓ Endpoints ↓↓↓*/ 

//Login And Authentification endpoints
app.post("/createUser", createUser)



/*↑↑↑ Endpoints ↑↑↑*/ 
/*------------------------*/
app.get("*", (req,res) => {
    res.status(404).json({
        status:404,
        message: "This is obviously not what you are looking for",
    });
})

app.listen(8000);