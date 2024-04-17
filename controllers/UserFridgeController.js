const UserFridge = require('../models/UserFridge');
const { db, addDoc, collection, getDocs, getDoc} = require("../models/firebase");
const { doc, setDoc } = require("firebase/firestore");

exports.retrieveUserFridge = async (req, res) => {
    try {
        const username = "testuser";

        const fridgeCollection = collection(db, 'Fridge');
        const fridgeSnapshot = await getDocs(fridgeCollection);

        // Find the document with the specified username
        let fridgeData;
        fridgeSnapshot.forEach(doc => {
            if (doc.id === username) {
                fridgeData = doc.data();
            }
        });

        if (fridgeData) {
            // Map items to UserFridge objects
            const items = fridgeData.items.map(item => ({
                item: item.item,
                quantity: item.quantity,
                perishabledays: item.perishabledays,
                perished: item.perished
            }));

            // Return the formatted items
            return items;
        } else {
            res.status(404).send("Fridge document not found for the specified username");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
exports.deductQuantity = async (req, res) => {
    const username = "testuser";
    const { item, quantity } = req.body;


    const fridgeCollection = collection(db, 'Fridge');
    const fridgeSnapshot = await getDocs(fridgeCollection);

    // Find the document with the specified username
    let fridgeData;
    fridgeSnapshot.forEach(doc => {
        if (doc.id === username) {
            fridgeData = doc.data();
        }
    });

    if (fridgeData) {
        // Map items to plain JavaScript objects
        const items = fridgeData.items.map(item => ({
            item: item.item,
            quantity: item.quantity,
            perishabledays: item.perishabledays,
            perished: item.perished
        }));

        // Find the item to update
        const itemToUpdate = items.find(fridgeItem => fridgeItem.item === item);

        if (itemToUpdate) {
            // Deduct the quantity
            itemToUpdate.quantity -= parseInt(quantity);

            // Check if quantity becomes zero and remove the item
            if (itemToUpdate.quantity === 0) {
                const index = items.indexOf(itemToUpdate);
                if (index !== -1) {
                    items.splice(index, 1);
                }
            }

            // Update the document in the database
            const fridgeRef = doc(fridgeCollection, username);
            await setDoc(fridgeRef, { items: items });

            res.status(200).send("Quantity deducted successfully");
        } else {
            res.status(404).send("Item not found in the fridge");
        }
    } else {
        res.status(404).send("Fridge document not found for the specified username");
    }
}
exports.retrieveItem = async (req, res) => {
    try {
        const itemName = req.params.itemid; // Assuming the parameter is called 'itemname'
        const username = "testuser"; // Assuming the username is fixed
        
        const fridgeCollection = collection(db, 'Fridge');
        const fridgeSnapshot = await getDocs(fridgeCollection);

        // Find the document with the specified username
        let fridgeData;
        fridgeSnapshot.forEach(doc => {
            if (doc.id === username) {
                fridgeData = doc.data();
            }
        });

        if (fridgeData) {
            // Find the item in the items array
            const item = fridgeData.items.find(item => item.item === itemName);

            if (item) {
                // If the item is found, send it as a JSON response
                return item;
            } else {
                // If the item is not found, send a 404 response
                res.status(404).send("Item not found in the fridge");
            }
        } else {
            // If the fridge document is not found, send a 404 response
            res.status(404).send("Fridge document not found for the specified username");
        }
    } catch (error) {
        // If an error occurs, send a 500 response with the error message
        res.status(500).send(error.message);
    }
}







