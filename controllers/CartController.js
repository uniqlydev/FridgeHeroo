const { db, addDoc, collection, getDocs } = require("../models/firebase");
const CartItem = require('../models/CartItem');
const Cart = require('../models/CartModel');

exports.addToCart = (req,res) => { 
    const {item, quantity} = req.body;

    const cartItem = new CartItem(item, quantity);

    if (!req.session.cart) {
        req.session.cart = new Cart();
    }

    req.session.cart.items.push(cartItem);

    res.status(200).send(req.session.cart);
}

exports.publishCart = async (req,res) => {
    if (!req.session.cart) {
        res.status(500).send("Cart is empty");
        return;
    }

    const dateToday = new Date();

    // Format YYYY-MM-DD
    const formatDate = dateToday.toISOString().split('T')[0];

    try {
        const cartData = {
            items: req.session.cart.items,
            total: 0,
            date: formatDate,
            status: "Delivered"
        }

        const cartCollection = collection(db, 'Orders');
        const docRef = await addDoc(cartCollection, cartData);

        req.session.cart = new Cart();

        res.status(200).send("Order placed successfully");


    }catch (e) {
        res.status(500).send(e.message);
    }
}