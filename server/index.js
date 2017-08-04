const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.clientID,
            clientSecret: keys.clientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
            console.log(profile);
        }
    )
);

app.get('/', (req, res) => {
    res.send('Digital Flash...Yeah!');
});

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
});