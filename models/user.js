const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	money: { type: Number, required: true },
})

let User = module.exports = mongoose.model('User', userSchema)

//----------------------------------------------------------------------------------------
//Promise for getUserMoney
module.exports.getUserMoney = (id, callback) => {
    return new Promise ((resolve, reject) => {
        User.findById(id, 'money', (err, user) => {
            if(err){
                console.log('Error: can\'t get user money. ' + err.message);
            }
            else{
                var userMoney = user.money;
                //res.json(userMoney);
                resolve(userMoney);
            }
        })
    })
};

// Deduct User Money
module.exports.deductUserMoney = function(id, newMoney, options, callback) {
    let query = {_id: id};
    let update = {
        money: newMoney
    };
    //console.log(update);
    User.findOneAndUpdate(query, update, options, callback);
};