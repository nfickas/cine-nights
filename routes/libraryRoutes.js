const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
    app.put('/api/library/movies/:id', (req, res) => {
        var movie_id = req.id;
        var user_id = req.user.user_id;
        User.findByIdAndUpdate({id: user_id}, {movies: movie_id}, {upsert: true}, function(err, doc){
            if(err){res.send(400);}
            res.send(203);
        });
    });
};