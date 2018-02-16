const express = require('express')
const router = express.Router()
const ExtendedError = require('../services/error-prototypes').ExtendError

const Order = require('../models/order')
const User = require('../models/user')
const Product = require('../models/product')

router.get('/orders', (req, res, next) => {
	Order.find({})
		.exec()
		.then((orders) => { res.json(orders) })
		.catch((err) => { next(new ExtendedError('Can\'t get oders ', 500, err)) })
})

module.exports = router