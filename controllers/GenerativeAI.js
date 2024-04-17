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
        const fridgeJson = JSON.stringify(fridge);

        const { prompt } = req.body;

        const result = await model.generateContent(prompt + ` Base your answer with my fridge data ${fridgeJson}` + "Your output structure should be a json file consisting of recipe name, ingredients, required ingredients, available ingredients from the user fridge, and instructions. You are to provide a json file.\n Clean the json file make sure it doesn't have 1/2 cup or somehthing similar. If it has, 1/2 cup just make it 0.5 so it remains its data type. FOLLOW THIS STRICTLY if it's a NUMBER or a UNIT OF MEASUREMENT or it's A NUMBER OR DECIMAL. Don't add cup to it or teaspoons or something similar as it ruins the integrity of the json file.");
        const response = await result.response;
        const jsonResponseString = response.text();

        // Remove Markdown-style code block notation
        const cleanedJsonResponseString = jsonResponseString.replace(/```json\n|```/g, '');

        // Parse the cleaned JSON string
        const jsonResponse = JSON.parse(cleanedJsonResponseString);

        // Sending JSON response
        res.status(200).json(jsonResponse);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

exports.generateCartRecommendations = async (req,res) => {
    try {

    }catch(e) {

    }
}

