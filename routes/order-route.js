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

router.post('/order', function(req, res){
    let productID = req.body.product;
    let orderQuant = req.body.quantity;
    let userID = req.body.user;

    Promise.all([
        User.getUserMoney(userID), //give back userMoney
        Product.getProductData(productID) //give back productQuant productPrice
    ]).then(values => {
        let userMoney = values[0];
        let productQuant = values[1][0];
        let productPrice = values[1][1];
        // checking conditions
        if (orderQuant > productQuant) {
			console.log('Not enough product quantity in shop');
			return res.status(400).send({
				message: 'Not enough product quantity in shop!'
			 });
        } else if (userMoney < productPrice * orderQuant) {
			console.log('Not enough users money for purchase');
			return res.status(400).send({
				message: 'Not enough users money for purchase!'
			 });
        } else {
            // create Order record
            Order.createOrder(userID, productID, orderQuant, function(err, user){
                if(err) {
                    console.log('Error ' + err.message);
                }
                console.log('Order created!');
            });
            // deduct money from user
            let newUserMoney = userMoney-(productPrice * orderQuant);
            User.deductUserMoney(userID, newUserMoney, {new:true}, function(err, user){
                // {new:true} - printout new value
                if(err){
                    console.log('Error ' + err.message);
                }
                res.json(user);
                console.log('User money updated!');
            });

            // update Product quantity
            let newProductQuant = productQuant - orderQuant;
            Product.updateProductQuantity(productID, newProductQuant, {new:true}, function(err, product){
                if(err){
                    console.log('Error ' + err.message);
                }
                //res.json(product);
                console.log('Product quantity updated!');
            });
        }
    })
});

module.exports = router