// mongoClient.js
const { connectDB } = require('./db');

async function findMovie(title) {
    const db = await connectDB();
    const collection = db.collection('movies');
    const movie = await collection.findOne({ title: title });
    console.log(`Searching for movie with title: '${title}'`);
    if (movie) {
        console.log(`Movie found: '${movie.title}'`);
    } else {
        console.log('Movie not found');
    }
    return movie;
}

async function addMovie(movie) {
    const db = await connectDB();
    const collection = db.collection('movies');
    const result = await collection.insertOne(movie);
    console.log(`Adding movie: '${movie.title}'`);
    console.log(`Movie added with ID: ${result.insertedId}`);
    return result;
}

async function deleteMovie(title) {
    const db = await connectDB();
    const collection = db.collection('movies');
    const result = await collection.deleteOne({ title: title });
    console.log(`Attempting to delete movie with title: '${title}'`);
    console.log(`Delete operation result: ${result.deletedCount} item(s) deleted.`);
    return result;
}

module.exports = { findMovie, addMovie, deleteMovie };
