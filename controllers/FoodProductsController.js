
const { db, addDoc, collection, getDocs } = require("../models/firebase");
const ProductModel = require("../models/ProductModel");

exports.addProduct = async (req, res) => {
    const {name, price, category, shelflife} = req.body;

    try {
        const product = new ProductModel(name, price, category, shelflife);

        const productData = {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.cateory,
            shelflife: product.shelflife,
        };

        const foodCollection = collection(db, 'Product');
        const docRef = await addDoc(foodCollection, productData);

        res.status(200).send("Product added successfully");
    }catch(e) {
        res.status(500).send("Internal Server Error");
    }
};