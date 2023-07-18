"use strict"

const express = require("express");
const cors = require('cors');
const app = express();


const mongoFunctions = require("./mongoFunctions");

/*
const conf = require("./config/serverConfig")
const port = conf.port
const ip = conf.ip
*/
const port = process.env.port || 3001;


// 
app.use(express.urlencoded());
app.use(express.json());
app.use(cors()); //-> dkdc
//

// middleware per mostrare solo le richieste
app.use("/", function(req,res,next){
    console.log(req.originalUrl)
    next()
})

app.post("/insert", function(req,res){
    // convalidare lato server i parametri diventava davvero troppo lungo, ma lo faccio se voelte :)
    mongoFunctions.insertOne(res, "modules", req.body)
})

app.get("/show", function(req,res){
    mongoFunctions.find(res, "modules", {}, {})
})


app.listen(port,  () => {
    console.log(`Server running on port: ${port}`)
})

