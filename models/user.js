const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	money: { type: Number, required: true },
})

module.exports = mongoose.model('User', userSchema)
