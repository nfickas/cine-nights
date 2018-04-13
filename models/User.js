const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    movies: [String]
});

mongoose.model('users', userSchema);