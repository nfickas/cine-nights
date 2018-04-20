const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    Title: String,
    Year: String,
    imdbID: String,
    Poster: String
});

mongoose.model('movies', movieSchema);