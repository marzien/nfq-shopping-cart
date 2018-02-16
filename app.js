const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const errorHandler = require('./services/error-handler')
const ExtendedError = require('./services/error-prototypes').ExtendError
var app = express()

app.use(express.static(__dirname + '/client'))
app.use(bodyParser.json())

app.use(require('./routes/index'))
app.use(require('./routes/product-route'))
app.use(require('./routes/order-route'))
app.use(require('./routes/user-route'))

app.use(errorHandler)

var port = process.env.PORT || 3000
var uristring = 'mongodb://admin:user123@ds157833.mlab.com:57833/shopping-cart'  ||  //mLab DB
				'mongodb://localhost/shopping-cart'                                 //local DB

mongoose.Promise  = global.Promise

mongoose.connect(uristring, { useMongoClient: true }, (err, next) => {
	if (err) {
		next(new ExtendedError('Can\'t connect to database:' + uristring, 500, err))
	} else {
		console.log('Succeeded connected to: ' + uristring)
	}
})

app.listen(port)
console.log('Running on port ' + port)


