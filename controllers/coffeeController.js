const Coffee = require("../models/Coffee")
const {validationResult} = require("express-validator")

class coffeeController {
    async createCoffeeItems(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "ошибка при создании товара", errors})
            }
            const {name, price, photoUrl, bonuses} = req.body; // get params from request
            const item = await Coffee.findOne({name})
            if (item) { // check if candidate already exist
                return res.status(400).json({message: "Товар с таким именем уже существует"})
            }
            const coffee = new Coffee({name, price, photoUrl, bonuses}); // create user
            await coffee.save() // save user
            return res.json({message: "Товар успешно создан"})
        } catch (e) {
            console.log(e);
            res.status(400).json(e)

        }
    }

    async getCoffeeItems(req, res) {
        try {
            const coffees = await Coffee.find()
            res.json(coffees)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new coffeeController()
