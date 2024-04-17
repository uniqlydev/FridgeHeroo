const UserFridge = require('../models/UserFridge');
const { db, addDoc, collection, getDocs, getDoc} = require("../models/firebase");
const { doc, setDoc } = require("firebase/firestore");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const { resolve } = require("path");

const sendExpirationEmail = async (items) => {
    require('dotenv').config();

    const mailerSend = new MailerSend({
        apiKey: process.env.API_MAILER_KEY,
    });

      
    const sentFrom = new Sender("bren@trial-pq3enl6y3omg2vwr.mlsender.net", "FridgeHero");
      
    const recipients = [
        new Recipient("bomber8183@gmail.com", "Brendan Castillo")
        // new Recipient("matthew_wassmer@dlsu.edu.ph", "Matthew Wassmer")
    ];

    const text = "Hey testuser! \n\nHope you're doing awesome! 😊\n\nWe just wanted to drop you a quick reminder from FridgeHero that some of the goodies in your fridge are about to hit their expiration dates.\n\nWe're all about helping you make the most of your groceries and avoid any food waste!\n\n🌱Check out what's on the list of soon-to-expire items:\n\n\t- Porterhouse Steak\n\n\nTime to get creative with your meals and use up these ingredients before they go bad! 🍳🥗 And hey, if you're ever stuck for ideas on how to use them, give our FridgeHero a try. We've got your back! 💪\n\nThanks for being a part of the FridgeHero fam! Keep on rockin' those culinary adventures! 🚀\n\n\nCheers,\nThe FridgeHero Crew"

    const html = `
        <p>Hey testuser!</p>
        <p>Hope you're doing awesome! 😊</p>
        <p>We just wanted to drop you a quick reminder from FridgeHero that some of the goodies in your fridge are about to hit their expiration dates.</p>
        <p>We're all about helping you make the most of your groceries and avoid any food waste!</p>
        <p>🌱 Check out what's on the list of soon-to-expire items:</p>
            <ul>
                ${items.map(item => `<li>${item.item}</li>`).join('')}
            </ul>
        <p>Time to get creative with your meals and use up these ingredients before they go bad! 🍳🥗 And hey, if you're ever stuck for ideas on how to use them, give our FridgeHero a try. We've got your back! 💪</p>
        <p>Thanks for being a part of the FridgeHero fam! Keep on rockin' those culinary adventures! 🚀</p>
        <p>Cheers,<br>The FridgeHero Crew</p>
        <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihZvAAEZfFSwiXtkWMxPbmE91-4Son8p2zicVObI7y7MOsAKXXMBF2xYvJx8ZS65ei2ne7AxXdp6_YBHtfxJEmbV7QhA8hlJrxQ=s2560" alt="FridgeHero Logo" style="width: 200px; height: auto;">
    `;
      
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("🥑 Don't Let Your Groceries Go to Waste! 🍓")
        .setHtml(html)

    try {
        await mailerSend.email.send(emailParams);
        console.log('Email sent successfully.');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}

const track = async (item) => {
    let days = 0;

    // For loop to track perishable days
    for (let i = 0; i < item.perishabledays; i++) {
        console.log(`Item ${item.item} has ${item.perishabledays - days} days left`);
        // Increment after 30 mins
        await new Promise(resolve => setTimeout(resolve, 1800000));
        days++;
        
        // Check if the item has expired
        if (days === item.perishabledays) {
            console.log(`Item ${item.item} has expired`);
            item.perished = true;
            break; // Exit the loop early once the item expires
        }
    }
};


const getAllPerishedItems = async (items) => {
    return items.filter(item => item.perished);
};


const background = async () => {
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
            const items = fridgeData.items.map(item => new UserFridge(item.item, item.quantity, item.perishabledays));

            // Asynchronously track perishable days for each item
            await Promise.all(items.map(item => track(item)));

            // Get all perished items
            const perishedItems = await getAllPerishedItems(items);

            // Convert UserFridge objects to plain JavaScript objects
            const updatedItems = items.map(item => ({
                item: item.item,
                quantity: item.quantity,
                perishabledays: item.perishabledays,
                perished: item.perished // Include perished status if needed
            }));

            // Print each perished item
            perishedItems.forEach(item => {
                console.log(`Perished Item: ${item.item}`);
            });

            // Send expiration email
            // await sendExpirationEmail(perishedItems);

            // Update the document in the database with plain JavaScript objects
            const fridgeRef = doc(fridgeCollection, username);
            await setDoc(fridgeRef, { items: updatedItems });
        } else {
            console.log("Fridge document not found for the specified username");
        }
    } catch (error) {
        console.error("Error in background job:", error);
    }
};

exports.background = background;





