const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const FoodRoutes = require('./routes/FoodProductRoutes');
const CartRoutes = require('./routes/CartRoutes');
const GenRoutes = require('./routes/GenAIRoutes');
const CartController = require('./controllers/CartController');
const FridgeRoutes = require('./routes/FridgeRoutes');
const background = require('./models/background');


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

// Background processes
background.background();

app.get('/', async (req, res) => {
    res.render('homepage/index', { title: 'Homepage' });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/order/meat', async (req, res) => {
    res.render('category/choose-meat', { title: 'Meat' });
});

app.get('/order/dairy', async (req, res) => {
    res.render('category/choose-dairy', { title: 'dairy' });
});

app.get('/order/fruit', async (req, res) => {
    res.render('category/choose-fruit', { title: 'fruit' });
});

app.get('/order/vegetable', async (req, res) => {
    res.render('category/choose-vegetable', { title: 'vegetable' });
});

app.get('/order/meat/steak', async (req, res) => {
    res.render('productpage/steak', { title: 'Meat' });
});

app.get('/order/dairy/egg', async (req, res) => {
    res.render('productpage/egg', { title: 'egg' });
});

app.get('/order/fruit/banana', async (req, res) => {
    res.render('productpage/banana', { title: 'banana' });
});

app.get('/order/vegetable/bellpepper', async (req, res) => {
    res.render('productpage/bellpepper', { title: 'bellpepper' });


});

app.get('/cart', async (req, res) => {
    res.render('cart/cart', { 
        title: 'Cart',
        cart: req.session.cart
    });
});

app.get('/fridge', async (req, res) => {
    res.render('fridge/fridge', { title: 'Fridge' });
});