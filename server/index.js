const express = require('express');
require('./services/passport');

const app = express();

// basic home route
app.get('/', (req, res) => {
    res.send('Digital Flash...Yeah!');
});

// authentication routes
require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
});
