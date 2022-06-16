const History = require('../models/HistoryPDF')
const User = require("../models/User")

class historyController {

    async createUserHistory(req, res) {
        try {
            const {ownerPhone, pdfUrl, dateOfCreation, mileage} = req.body; // get params from request
            const user = await User.findOne({'phone': ownerPhone});
            if (!user) {
                return res.status(404).json({message: `Пользователя с ${ownerPhone} не существует`})
            }
            const pdfFile = new History({ ownerId: user.id, pdfUrl, dateOfCreation, mileage}); // create user
            await pdfFile.save() // save user

            return res.json({message: "Машину успішно збережено"})
        } catch (e) {
            console.log(e)
        }
    }

    async getUserHistory(req, res) {
        try {
            const id = req.params.id;
            const pdfFiles = await History.find({ownerId: id})
            res.json(pdfFiles)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new historyController()
