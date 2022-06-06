const {Schema, model} = require("mongoose")

const Coffee = new Schema({
    name: {type: String, unique: true, required: true},
    price: {type: String, required: true},
    photoUrl: {type: String, required: true},
    bonuses: {type: Number},
})

module.exports = model("Coffee", Coffee)
