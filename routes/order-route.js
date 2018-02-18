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

router.get('/usersByOrders', (req, res, next) => {
	User.find(
		{ '_id': { $in: req.query.user_ids }}
	)
		.exec()
		.then((orders) => { res.json(orders) })
		.catch((err) => {
			next(new ExtendedError('Can\'t get oders by orders', 500, err))
		})
})

router.get('/productsByOrders', (req, res, next) => {
	Product.find(
		{ '_id': { $in: req.query.product_ids }}
	)
		.exec()
		.then((orders) => { res.json(orders) })
		.catch((err) => {
			next(new ExtendedError('Can\'t get products by orders ', 500, err))
		})
})

module.exports = router