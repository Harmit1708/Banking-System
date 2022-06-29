const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbName= "Banking";
const dbUrl = `mongodb+srv://Harmit1708:Harmit@cluster0.brz2m.mongodb.net/${dbName}`;
module.exports = {mongodb,MongoClient,dbUrl}