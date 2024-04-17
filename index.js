const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
app.use(express.json()) 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// load .env 
require('dotenv').config();

const port = process.env.PORT || 3000;

// Session
app.use(session
    ({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }));

// Routes (to be defined later)


app.get('/', (req, res) => {
    res.render('homepage/index', { title: 'Homepage' });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


