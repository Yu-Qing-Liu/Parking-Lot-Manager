"use strict";

const express = require('express');
const morgan = require("morgan")

const {} = require("./handlers");

express()

.use(morgan("tiny"))
.use(express.json())
.use(express.static("public"))

/*------------------------*/
/*↓↓↓ Endpoints ↓↓↓*/ 




/*↑↑↑ Endpoints ↑↑↑*/ 
/*------------------------*/
.get("*", (req,res) => {
    res.status(404).json({
        status:404,
        message: "This is obviously not what you are looking for",
    });
})

.listen(8000);