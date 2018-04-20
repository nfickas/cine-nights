const mongoose = require('mongoose');
const User = mongoose.model('users');
const request = require('request');
const requireLogin = require('../middlewares/requireLogin');
const Movie = mongoose.model('movies');

module.exports = (app) => {
    app.get('/api/library/movies', requireLogin, (req, res) => {
        var movies = [];
        User.findOne({facebookId: req.user.facebookId}, function(err, user){
            if(err){
                res.send(400);
                return;
            }
            if(user){
                Movie.find({imdbID: {$in: user.movies}}, function(err, movies){
                    if(err){
                        res.send("An error occured retrieving the movie.");
                    }
                    if(movies){
                        var json = JSON.stringify(movies);
                        res.send(json);
                    }else{
                        res.send("Could not find all movies.");
                    }
                });
            }
        })
    });
};