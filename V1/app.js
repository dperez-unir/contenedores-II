// movie.js
const readline = require('readline');
const { findMovie, addMovie, deleteMovie } = require('./client');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const mainMenu = async () => {
    console.log("\nMain Menu");
    console.log("1. Consult movie");
    console.log("2. Add movie");
    console.log("3. Delete movie");
    console.log("4. Exit");

    return new Promise((resolve) => {
        rl.question('Choose an option: ', (option) => {
            resolve(option);
        });
    });
};

const consultMovie = async () => {
    return new Promise((resolve) => {
        rl.question('Enter the title of the movie to consult: ', async (title) => {
            const movie = await findMovie(title);
            if (movie) {
                console.log("Found movie:");
                console.log(`Title: ${movie.title}`);
                console.log(`Director: ${movie.director || 'N/A'}`);
                console.log(`Year: ${movie.year || 'N/A'}`);
                console.log(`Country: ${movie.country || 'N/A'}`);
            } else {
                console.log("No movie found with that title.");
            }
            resolve();
        });
    });
};

async function addMovieThroughCLI() {
    return new Promise((resolve) => {
        rl.question('Enter title of the new movie: ', (title) => {
            rl.question('Enter director name: ', (director) => {
                rl.question('Enter release year: ', (year) => {
                    rl.question('Enter country: ', async (country) => {
                        const movie = {
                            title: title,
                            director: director,
                            year: parseInt(year, 10),
                            country: country
                        };
                        await addMovie(movie);
                        console.log("New movie added:", movie);
                        resolve();  // Correct placement of resolve()
                    });
                });
            });
        });
    });
}

async function deleteMovieThroughCLI() {
    return new Promise((resolve) => {
        rl.question('Enter the title of the movie to delete: ', async (title) => {
            const result = await deleteMovie(title);
            if (result.deletedCount === 1) {
                console.log("Movie successfully deleted.");
            } else {
                console.log("No movie found with that title or delete failed.");
            }
            resolve();
        });
    });
}

const run = async () => {
    let exit = false;

    while (!exit) {
        const option = await mainMenu();
        switch (option) {
            case '1':
                await consultMovie();
                break;
            case '2':
                await addMovieThroughCLI();
                break;
            case '3':
                await deleteMovieThroughCLI();
                break;
            case '4':
                exit = true;
                console.log("Exiting program...");
                break;
            default:
                console.log("Invalid option, please choose again.");
        }
    }
    rl.close();
};

run().catch(console.error);
