const {Schema, model} = require("mongoose")

const HistoryPDF = new Schema({
    pdfUrl: {type: String, unique: true, required: true},
    ownerId: {type: String, required: true},
    dateOfCreation: {type: String, required: true},
    mileage: {type: String, required: true},
})


module.exports = model("HistoryPDF", HistoryPDF)
