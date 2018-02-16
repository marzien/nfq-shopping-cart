const express = require('express')
const router = express.Router()
const ExtendedError = require('../services/error-prototypes').ExtendError

const Product = require('../models/product')

router.get('/products', (req, res, next) => {
	Product.find({})
		.exec()
		.then((products) => res.json(products))
		.catch((err) => next(new ExtendedError('Can\'t get products', 500, err)))
})

router.get('/product/:_id', (req, res, next) => {
	Product.findById({ _id: req.params._id })
		.exec()
		.then((product) => res.json(product))
		.catch((err) => next(new ExtendedError('Wrong product ID', 500, err)))
})

module.exports = router