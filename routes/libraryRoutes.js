const mongoose = require('mongoose');
const User = mongoose.model('users');
const request = require('request');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.get('/api/library/movies', requireLogin, (req, res) => {
        request.get("http://www.omdbapi.com/?apikey=8f1ff104&i=" + req.user["movies"][0], (error, response, body) =>{
            var json = JSON.parse(body);
            res.send(json);
        });
    });
};