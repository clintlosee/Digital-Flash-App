const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.DATABASE_LOCAL)

const app = express();

// basic home route
app.get('/', (req, res) => {
    res.send('Digital Flash...Yeah!');
});

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

// authentication routes
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
});
