const { MongoClient } = require("mongodb");

const uri = "mongodb://root:example@db:27017/admin";
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        return client.db("movies");  // Retorna la base de datos específica a usar
    } catch (e) {
        console.error("Connection to MongoDB failed", e);
        throw e;  // Re-lanza el error para manejarlo más arriba si es necesario
    }
}

module.exports = { connectDB, client };
