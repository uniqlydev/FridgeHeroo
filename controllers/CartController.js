const { db, addDoc, collection, getDocs, getDoc, updateDoc} = require("../models/firebase");
const { doc, setDoc } = require("firebase/firestore");
const CartItem = require('../models/CartItem');
const Cart = require('../models/CartModel');


exports.addToCart = (req, res) => { 
    const { item, quantity } = req.body;

    const itemToAdd = {
        item,
        perishabledays: 5,
    };

    if (!req.session.cart) {
        req.session.cart = new Cart();
    }

    // Check if the item already exists in the cart
    const existingItemIndex = req.session.cart.items.findIndex(cartItem => {
        return cartItem.item.item === itemToAdd.item && cartItem.item.perishabledays === itemToAdd.perishabledays;
    });

    if (existingItemIndex !== -1) {
        // Item already exists, update the quantity
        req.session.cart.items[existingItemIndex].quantity += quantity;
    } else {
        // Item doesn't exist, add it to the cart
        const cartItem = new CartItem(itemToAdd, quantity);
        req.session.cart.items.push(cartItem);
    }

    console.log(req.session.cart);
    res.status(200).send(req.session.cart);
};



const getItemsAndQuantity = (items) => {
    const itemsAndQuantity = [];

    for (const item of items) {
        const { item: productId, quantity } = item;
        itemsAndQuantity.push({ productId, quantity });
    }

    return itemsAndQuantity
}


exports.publishCart = async (req, res) => {
    if (!req.session.cart) {
        res.status(500).send("Cart is empty");
        return;
    }

    const dateToday = new Date();
    const formatDate = dateToday.toISOString().split('T')[0];

    try {
        const cartData = {
            items: req.session.cart.items,
            total: 0,
            date: formatDate,
            status: "Delivered",
            user: "testuser"
        }

        // Add cart data to Orders collection
        const cartCollection = collection(db, 'Orders');
        const docRef = await addDoc(cartCollection, cartData);

        // Get items and quantity from the cart
        const itemsAndQuantity = getItemsAndQuantity(req.session.cart.items);

        // Define the document ID for the user's fridge
        const documentID = "testuser";

        const fridgeCollection = collection(db, 'Fridge');

        // Check if the document exists
        const docSnap = await getDoc(doc(fridgeCollection, documentID));
        if (docSnap.exists()) {
            // If document exists, update it with new items or increment quantity
            const existingFridgeData = docSnap.data().items;
            itemsAndQuantity.forEach(newItem => {
                const existingItemIndex = existingFridgeData.findIndex(item => item.item === newItem.productId.item);
                if (existingItemIndex !== -1) {
                    // If the item already exists, update its quantity
                    existingFridgeData[existingItemIndex].quantity += newItem.quantity;
                } else {
                    // If the item does not exist, add it to the fridge data
                    existingFridgeData.push({ item: newItem.productId.item, quantity: newItem.quantity, perishabledays: newItem.productId.perishabledays, perished: false});
                }
            });
        
            // Set the updated fridge data in the database
            await setDoc(doc(fridgeCollection, documentID), {
                items: existingFridgeData
            });
        } else {
            // If document does not exist, create it
            const fridgeData = itemsAndQuantity.map(item => ({
                item: item.productId.item,
                quantity: item.quantity,
                perishabledays: item.productId.perishabledays,
                perished: false
            }));

            await setDoc(doc(fridgeCollection, documentID), {
                items: fridgeData
            });
        }

        // Reset the cart
        req.session.cart = new Cart();

        res.status(200).send("Order placed successfully");
    } catch (e) {
        res.status(500).send(e.message);
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
