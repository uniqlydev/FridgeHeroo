const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const FoodRoutes = require('./routes/FoodProductRoutes');
const CartRoutes = require('./routes/CartRoutes');
const GenRoutes = require('./routes/GenAIRoutes');
const CartController = require('./controllers/CartController');
const FridgeRoutes = require('./routes/FridgeRoutes');

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
app.use('/api/foods', FoodRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/gen', GenRoutes);
app.use('/api/fridge', FridgeRoutes)

app.get('/', async (req, res) => {
    res.render('homepage/index', { title: 'Homepage' });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


