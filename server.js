"use strict"

const express = require("express");
const cors = require('cors');
const app = express();


const mongoFunctions = require("./mongoFunctions");
const PersonaFisica = require("./js/PersonaFisica");

const port = 8888;


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
    console.log(PersonaFisica.controlla({"cognome":"Sanino","nome":"Fabio","cap":16262,"metodo":{"metodo":"Luogo e Data di Nascita","valore":"La Morra Bra 2023-07-05"},"numeroParenti":3,"coniuge":true,"padre":false,"madre":false,"figli":2,"attivita":"Libero Professionista o Lavoratore Autonomo","immobili":"SI","animali":"cani e/o gatti"})
    )
    
    mongoFunctions.find(res, "modules", {}, {})
})


app.listen(port,  () => {
    console.log(`Server running on port: ${port}`)
})

