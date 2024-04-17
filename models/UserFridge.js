class UserFridge {
    constructor(item, quantity, perishabledays) {
        this.item = item;
        this.quantity = quantity;
        this.perishabledays = perishabledays;
        this.perished = false;
    }
}

module.exports = UserFridge;