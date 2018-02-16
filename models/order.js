const mongoose = require('mongoose')
const Schema = mongoose.Schema

let orderSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
	quantity: { type: Number, required: true },
	createdOn: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Order', orderSchema)
