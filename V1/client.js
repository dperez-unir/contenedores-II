// mongoClient.js
const { connectDB } = require('./db');

async function findMovie(title) {
    const db = await connectDB();
    const collection = db.collection('movies');
    return collection.findOne({ title: title });
}

async function addMovie(movie) {
    const db = await connectDB();
    const collection = db.collection('movies');
    return collection.insertOne(movie);
}

async function deleteMovie(title) {
    const db = await connectDB();
    const collection = db.collection('movies');
    const result = await collection.deleteOne({ title: title });
    console.log(`Delete operation result: ${result.deletedCount}`);
    return result;
}


module.exports = { findMovie, addMovie, deleteMovie };
