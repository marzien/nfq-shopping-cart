const mongoose = require('mongoose')
const Schema = mongoose.Schema

let orderSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
	quantity: { type: Number, required: true },
	createdOn: { type: Date, default: Date.now },
})

let Order = module.exports = mongoose.model('Order', orderSchema)

// Create oder
module.exports.createOrder = function(userID, productID, quantity, callback) {
    order = {
        "user": userID,
        "product": productID,
        "quantity": quantity
    };
    Order.create(order, callback);
};