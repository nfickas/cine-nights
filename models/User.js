const mongoose = require('mongoose');
const { Schema } = mongoose;
const MovieSchema = require('./Movie');

const userSchema = new Schema({
    facebookId: String,
    profileName: String,
    movies: [String],
    picture: String
});

mongoose.model('users', userSchema);