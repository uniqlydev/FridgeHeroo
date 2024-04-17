const { GoogleGenerativeAI } = require("@google/generative-ai");
const genresponse = require('../models/GenerativeResponse');
const UserFridgeController = require('./UserFridgeController');

require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.API_AI_STUDIO);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});


exports.sendQuery = async (req, res) => {
    try {

        // Retrieve fridge data 
        const fridge = await UserFridgeController.retrieveUserFridge(req, res);

        console.log(fridge);

        // Make fridge into a json 
        const fridgeJson = JSON.stringify(fridge);

        const { prompt } = req.body;

        const result = await model.generateContent(prompt + `Base your answer with my fridge data ${fridgeJson}` + "Your output structure should be \nIngredients:\nWhat I have\nWhat I should buy\nRecipe name:\nInstructions");
        const response = await result.response;
        const text = response.text();
    
        const genResponse = new genresponse(prompt, text);
    
        res.status(200).send(genResponse);
    }catch(e) {
        res.status(500).send(e.message);
    }
}

