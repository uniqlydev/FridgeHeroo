const { db, addDoc, collection, getDocs } = require("../models/firebase");
const CartItem = require('../models/CartItem');
const Cart = require('../models/CartModel');
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const { resolve } = require("path");

exports.addToCart = (req,res) => { 
    const {item, quantity} = req.body;

    const itemadd = {
        item,
        perishabledays: 5,
    }

    const cartItem = new CartItem(itemadd, quantity);

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
            status: "Delivered",
            user: "testuser"
        }

        const cartCollection = collection(db, 'Orders');
        const docRef = await addDoc(cartCollection, cartData);

        req.session.cart = new Cart();

        res.status(200).send("Order placed successfully");


    }catch (e) {
        res.status(500).send(e.message);
    }
}

const sendExpirationEmail = async () => {
    require('dotenv').config();

    const mailerSend = new MailerSend({
        apiKey: process.env.API_MAILER_KEY,
    });

      
    const sentFrom = new Sender("bren@trial-pq3enl6y3omg2vwr.mlsender.net", "FridgeHero");
      
    const recipients = [
        new Recipient("bomber8183@gmail.com", "Brendan Castillo")
    ];
      
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("This is a Subject")
        .setHtml("<strong>This is the HTML content</strong>")
        .setText("This is the text content");

    try {
        await mailerSend.email.send(emailParams);
        console.log('Email sent successfully.');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}

// Function to track perishable days and log expiration
const trackPerishableDays = async (items) => {
    let sendEmail = false;

    const intervalPromises = items.map(item => {
        return new Promise(resolve => {
            let daysRemaining = item.perishabledays;
            const interval = setInterval(() => {
                daysRemaining--;
                console.log(`Item ${item.productId} - Days Remaining: ${daysRemaining}`);
                if (daysRemaining <= 0) {
                    clearInterval(interval);
                    sendEmail = true;
                    resolve(); // Resolve the promise when the interval is cleared
                }
            }, 1000); // 10 seconds interval
        });
    });

    await Promise.all(intervalPromises);

    if (sendEmail) {
        await sendExpirationEmail();
    }
};



exports.getOrdersByUser = async (req, res) => {
    const username = "testuser";

    try {
        const cartCollection = collection(db, 'Orders');
        const querySnapshot = await getDocs(cartCollection);
        const orders = [];

        querySnapshot.forEach(doc => {
            const data = doc.data();
            if (data.user === username) {
                orders.push(data);
            }
        });

        // Extract perishable days and product ID from each item in orders
        let items = [];
        orders.forEach(order => {
            order.items.forEach(item => {
                const { perishabledays, item: productId } = item.item;
                items.push({ perishabledays, productId });
            });
        });

        req.session.items_track = items;

        // Start tracking perishable days
        trackPerishableDays(req.session.items_track);

        res.status(200).send("Perishable days tracking started.");
    } catch (e) {
        res.status(500).send(e.message);
    }
}
