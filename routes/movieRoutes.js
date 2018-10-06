const request = require('request');
var mongoose = require('mongoose');
const Movie = mongoose.model('movies');
const User = mongoose.model('users');

module.exports = (app) => {
    app.get('/api/movies/:title', (req, res) => {
        request.get("http://www.omdbapi.com/?type=movie&apikey=8f1ff104&s=" + req.params.title, (error, response, body) => {
            var json = JSON.parse(body);
            res.send(json["Search"]);
        });
    });

    app.post('/api/movies', (req, res) => {
        Movie.findOne({imdbID: req.body.imdbID}, function(err, movie){
            if(err)
                res.send("Made an oopsie");
            
            if(movie){
                
            }else{
                var newMovie = new Movie();
                newMovie.imdbID = req.body.imdbID;
                newMovie.Title = req.body.Title;
                newMovie.Year = req.body.Year;
                newMovie.Poster = req.body.Poster;
                newMovie.save();
                movie = newMovie;
            }
            User.findOneAndUpdate({facebookId: req.user.facebookId}, {$push:{movies: movie.imdbID}}, function(err, doc){
                if(err){
                    res.status(400).send("Unable to add movie to your library");
                }
                res.sendStatus(200);
            });
        });
    });

    app.delete('/api/movies/:id', (req, res) => {
        User.findOneAndUpdate({facebookId: req.user.facebookId}, {$pullAll: {movies: [req.params.id]}}, function(err, doc){
            if(err) {
                res.status(400).send("Unable to delete movie from your library");
            }
            else{
                res.sendStatus(200);
            }
        });
    });
};