"use strict"

const port = 8888;

const express = require("express");
const cors = require('cors');
const app = express();

// funzioni per l'utilizzo di MongoDb
const mongoFunctions = require("./mongoFunctions");

// classi per i controlli -> facilitano l'aggiornabilità in caso di cambiamenti nei moduli
const PersonaFisica = require("./js/PersonaFisica");
const PersonaGiuridica = require("./js/PersonaGiuridica");
const BisogniAssicurativi = require("./js/BisogniAssicurativi");


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
    // controlli eseguiti con le classi presenti nella cartella /js
    console.log(req.body)
    let check = true;
    try {
        if(req.body.persona.hasOwnProperty('cognome'))
            check = (!check) ? false : PersonaFisica.controlla(req.body.persona)
        else if(req.body.persona.hasOwnProperty('ragSoc')){
            check = (!check) ? false :  PersonaGiuridica.controlla(req.body.persona)
        }
        else
            check = false

        check = (!check) ? false : BisogniAssicurativi.controlla(req.body.assicurazione)
        
        console.log(check)
        if(check)
            mongoFunctions.insertOne(res, "modules", req.body)
        else
            res.end("{code: 2, message: missing or wrong parameters")

    } catch (exceptionVar) {
        res.end("{code: 2, message: missing or wrong parameters")
    }

    
})

app.get("/show", function(req,res){
    
    //console.log(PersonaFisica.controlla({"cognome":"Sanino","nome":"Fabio","cap":16262,"metodo":{"metodo":"Luogo e Data di Nascita","valore":"La Morra Bra 2023-07-05"},"numeroParenti":3,"coniuge":true,"padre":false,"madre":false,"figli":2,"attivita":"Libero Professionista o Lavoratore Autonomo","immobili":"SI","animali":"cani e/o gatti"}))
    
    //console.log(PersonaGiuridica.controlla({"ragSoc":"ssbsb","pIva":"17171771717","cap":"17171","settore":"shshs","immobili":"SI"}))
    
    //console.log(BisogniAssicurativi.controlla({"ambito":"Privato","copertureAssicurative":{"Responsabilità Civile":true,"Infortuni":false,"Malattie":false,"Furto":false,"Cauzioni":false,"Previdenza":true,"Multi rischi in Genere":false,"Tutela Legale":false,"Trasporti":false,"Auto":false,"Altro":false},"obbiettivi":[{"Protezione del proprio patrimonio per richieste di risarcimento dovute a danni causati a terzi":"nella vita personale"},{"Protezione dei beni":"propri","per":["per danneggiamento (es: incendio, scoppio, acqua condotta, esplosione, etc)","per sottrazione (es: furto, scippo, rapina, etc)"]},{"Protezione della propria persona e/o dei familiari":["se stessi"],"E in maniera specifica":["per infortuni"]},{"Protezione viaggi":"viaggi (annullamento, perdita bagagli, infortuni, assistenza sanitaria, ect)"}]}))
    
    mongoFunctions.find(res, "modules", {}, {})
})


app.listen(port,  () => {
    console.log(`Server running on port: ${port}`)
})

