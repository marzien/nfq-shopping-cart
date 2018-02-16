const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
	title: { type: String, required: true },
	type: { type: String, enum: ['furniture', 'food', 'clothes'], required: true },
	url: { type: String, required: true },
	quantity: { type: Number, required: true },
	price: { type: Number, required: true },
})

module.exports = mongoose.model('Product', productSchema)


