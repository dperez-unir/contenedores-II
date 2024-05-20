const express = require('express');
const { findMovie, addMovie, deleteMovie } = require('./client');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware para parsear JSON

// Endpoint para consultar películas por título
app.get('/movies/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const movie = await findMovie(title);
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).send('Movie not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Endpoint para añadir una nueva película
app.post('/movies', async (req, res) => {
    try {
        const movie = req.body;
        const result = await addMovie(movie);
        res.status(201).send(`Movie added with ID: ${result.insertedId}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Endpoint para eliminar una película por título
app.delete('/movies/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const result = await deleteMovie(title);
        if (result.deletedCount === 1) {
            res.status(200).send('Movie successfully deleted');
        } else {
            res.status(404).send('Movie not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
