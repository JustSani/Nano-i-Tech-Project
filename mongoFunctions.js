"use strict";

const mongo=require("mongodb");
const mongoClient=mongo.MongoClient;


// ----------------------------
// IMPOSTAZIONI PRESE DAL CONFIG
const urlServerMongoDb = "mongodb://localhost:27017";
const nomeDb = "NanoITech";
// ----------------------------



let obj;
let mongoFunctions = function () {}

function creaConnessione(nomeDb, res, callback){
    res.setHeader('Content-Type', 'application/json');

    // check istanza globale di mongo
    if(!global.mongo){
        let promise = mongoClient.connect(urlServerMongoDb);
        promise.then(function(connessione){
            // ne creiamo una se non è gia stata creata
            global.mongo = connessione.db(nomeDb);
            callback(connessione, global.mongo)
        });
        promise.catch(function(err){
            json = {code:-1, desc:"Errore nella connessione"};
            res.end(JSON.stringify(json));
        });
    }
    else{
        callback("", global.mongo)
    }
}


mongoFunctions.prototype.query = function(res, col, callback){
    creaConnessione(nomeDb, res, function(conn, db){
        let promise = db.collection(col)
        callback(promise, conn);
    })
}

mongoFunctions.prototype.find=function (res, col, find, select){
    creaConnessione(nomeDb, res, function(conn, db){
        let promise = db.collection(col).find(find).project(select).toArray();
        promise.then(function(ris){
            res.end(JSON.stringify(ris))
        });
        promise.catch(function(error){
            obj = { code:-2, desc:"Errore nella ricerca"}
            res.end(JSON.stringify(obj));
        });
    });
}


mongoFunctions.prototype.insertOne=function (res, col, obj, callback){
    creaConnessione(nomeDb, res, function(conn, db){
        let promise = db.collection(col).insertOne(obj);
        promise.then(function(ris){
             
            callback(ris)
        });
        promise.catch(function(err){
            obj = { cod:-2, desc:"Errore nell'inserimento"}
            res.end(JSON.stringify(obj));
             
        });
    });
}



module.exports = new mongoFunctions();