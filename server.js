"use strict"

const express = require("express");
const cors = require('cors');
const app = express();

/*
const conf = require("./config/serverConfig")
const port = conf.port
const ip = conf.ip
*/
const port = 8888;


// 
app.use(express.urlencoded());
app.use(express.json());
app.use(cors()); //-> dkdc
//

app.use("/", function(req,res,next){
    if(req.originalUrl.includes("api"))
        console.log(req.originalUrl)
    next()
})

app.get("/", function(req,res){
    res.end("Whatsup")
})



app.listen(port,  () => {
    console.log(`Server running on port: ${port}`)
})

