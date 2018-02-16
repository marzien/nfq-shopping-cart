const express = require('express')
const router = express.Router()
const ExtendedError = require('../services/error-prototypes').ExtendError

const User = require('../models/user')

router.get('/users', (req, res, next) => {
	User.find({})
		.exec()
		.then((products) => { res.json(products) })
		.catch((err) => { next(new ExtendedError('Can\'t get users', 500, err)) })
})

module.exports = router