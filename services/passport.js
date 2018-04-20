const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id })
        if(existingUser){
            return done(null, existingUser);
        }
        const user = await new User({ googleId: profile.id, movies: [] }).save()
        done(null, user);
    })
);

passport.use(new FacebookStrategy({
    clientID: keys.facebookAppID,
    clientSecret: keys.facebookAppSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields : ['id', 'email', 'name', 'photos'],
    proxy: true
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ facebookId: profile.id }, function(err, user) {
          if (err)
            return done(err);

            // if the user is found, then log them in
            if (user) {
                return done(null, user); 
            } else {
                // if there is no user found with that facebook id, create them
                const newUser = new User();
                newUser.facebookId = profile.id;
                newUser.profileName = profile.name.givenName + ' ' + profile.name.familyName;
                newUser.movies = [];
                newUser.picture = profile.photos[0].value;
                newUser.save();
                return done(null, newUser);
            }
        });
    });
  })
);