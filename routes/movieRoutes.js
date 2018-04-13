var request = require('request');

module.exports = (app) => {
    app.get('/api/movies/:title', (req, res) => {
        request.get("http://www.omdbapi.com/?apikey=8f1ff104&s=" + req.params.title, (error, response, body) => {
            var json = JSON.parse(body);
            res.send(json["Search"]);
        });
    });
};