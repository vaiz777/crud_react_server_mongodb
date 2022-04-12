const mongoose = require('mongoose')
const CoffeeSchema = new mongoose.Schema({
    
    coffeeName: {
        type: String,
        required: true
    },
    amountCoffee: {
        type: Number,
        required: true
    }

})

const Coffee = mongoose.model("Coffee", CoffeeSchema)
module.exports = Coffee