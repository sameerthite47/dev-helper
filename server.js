const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');

//Load routes
const users = require('./routes/users');
const categories = require('./routes/categories');
const posts = require('./routes/posts');

//Initialize express
const app = express();

//CORS
app.use(cors());

//Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB Connection
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log('Error: ', err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//Use routes
app.use('/api/users', users);
app.use('/api/categories', categories);
app.use('/api/posts', posts);

//Static assets in production mode

//Port setup
const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});