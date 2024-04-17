const UserFridge = require('../models/UserFridge');
const { db, addDoc, collection, getDocs, getDoc} = require("../models/firebase");
const { doc, setDoc } = require("firebase/firestore");

exports.retrieveUserFridge = async (req, res) => {
    try {
        // Retrieve fridge using document id 
        const documentId = "testuser"; // Assuming this is the document id

        // Get the fridge collection reference
        const fridgeCollection = collection(db, 'Fridge');

        // Get the fridge document reference
        const fridgeDocRef = doc(fridgeCollection, documentId);

        // Get the fridge document snapshot
        const fridgeDocSnapshot = await getDoc(fridgeDocRef);

        if (fridgeDocSnapshot.exists()) {
            // Extract fridge data
            const fridgeData = fridgeDocSnapshot.data();

            // Extract items from fridge data
            const fridgeItems = fridgeData.items;

            return fridgeItems;
        } else {
            // If the document doesn't exist
            res.status(404).send("Fridge document not found");
        }
    } catch (error) {
        console.error("Error retrieving user fridge:", error);
        res.status(500).send("Internal server error");
    }
};
