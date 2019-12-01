const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
	title: { type: String, required: true },
	type: { type: String, enum: ['furniture', 'food', 'clothes'], required: true },
	url: { type: String, required: true },
	quantity: { type: Number, required: true },
	price: { type: Number, required: true },
})

let Product = module.exports = mongoose.model('Product', productSchema)

//-----------------------------------------------------------------------
//Promise to get product data for order
module.exports.getProductData = (id, callback) => {
    return new Promise ((resolve, reject) => {
        Product.findById(id, ['quantity', 'price'], (err, product) => {
            if(err) {
                console.log('Error: can\'t get product quantity and price ' + err.message);
            }
            else{
                let productQuant = product.quantity;
                let productPrice = product.price;
                resolve([productQuant, productPrice]);
            }
        })
    })
};

// Update Product Quantity
module.exports.updateProductQuantity = function(id, newQuantity, options, callback) {
    let query = {_id: id};
    let update = {
        quantity: newQuantity
    };
    Product.findOneAndUpdate(query, update, options, callback);
};