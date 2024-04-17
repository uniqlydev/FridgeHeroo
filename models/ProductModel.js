const { v4: uuidv4 } = require('uuid');

class ProductModel {
    constructor(name, price, cateory, shelflife) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
        this.cateory = cateory;
        this.shelflife = shelflife;
    }
}

module.exports = ProductModel;