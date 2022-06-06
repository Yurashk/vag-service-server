const {Schema, model} = require("mongoose")

const Car = new Schema({
    name: {type: String, required: true},
    userId: {type: String, required: true},
    ownerPhone:{type: String, required: true},
    vinCode:{type: String, required: true},
    gosNumber:{type: String, required: true},
    photoUrl: {type: String, required: true},
    works: {type: Array, required: true},
    worksInProgress: {type: Array},
    worksDone: {type: Array},
})

module.exports = model("Car", Car)
