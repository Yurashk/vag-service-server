const Car = require("../models/Car")
const User = require("../models/User")
const TelegramApi = require("node-telegram-bot-api")
const bot_token = '5180143875:AAFuA6x8HhDeyKGcmxoP3cBRJaWcHk8lMUc'
const bot = new TelegramApi(bot_token, {polling: true})

class carsController {
    async createCarItem(req, res) {
        try {
            const {name, ownerPhone, photoUrl, works, vinCode, gosNumber} = req.body; // get params from request
            const user = await User.findOne({'phone': ownerPhone});
            if (!user) {
                return res.status(404).json({message: `Пользователя с ${ownerPhone} не существует`})
            }
            const car = new Car({name, userId: user.id, ownerPhone, photoUrl, works, vinCode, gosNumber}); // create user
            await car.save() // save user

            return res.json({message: "Машину успішно збережено"})
        } catch (e) {
            console.log(e);
            res.status(400).json(e)

        }
    }

    async getCarItemsByUser(req, res) {
        try {
            const id = req.params.id;
            const cars = await Car.find({userId: id})
            res.json(cars)
        } catch (e) {
            console.log(e)
        }
    }

    async getCarItemsById(req, res) {
        try {
            const id = req.params.id;
            const car = await Car.findById(id)
            res.json(car)
        } catch (e) {
            console.log(e)
        }
    }

    async changeCarItemsById(req, res) {
        try {
            const {id,name, works, worksInProgress, worksDone} = req.body;
            let car = await Car.findById(id)
            console.log(car)
            if (!car) {
                return res.status(404).json({message: `Машина відсутня`})
            }
            car.works = works;
            car.worksInProgress = worksInProgress;
            car.worksDone = worksDone;
            if(!car.works.length && !car.worksInProgress.length){
                await bot.sendMessage(-1001775833457, `По авто ${name} виконані всі роботи!`);
            }
            else await bot.sendMessage(-1001775833457, `Зміни по авто:${name}!`);
            await car.save();
            res.json(car)
        } catch (e) {
            console.log(e)
        }
    }

    async addWorkCarItemsById(req, res) {
        try {
            const {id, works} = req.body;
            let car = await Car.findById(id)
            console.log(car)
            if (!car) {
                return res.status(404).json({message: `Машина відсутня`})
            }
            for (let i = 0; i < works.length; i++) {
                car.works.push(works[i])
            }
            // car.works.concat(works);
            // car.worksInProgress = worksInProgress;
            // car.worksDone = worksDone;
            await car.save();
            res.json(car)
        } catch (e) {
            console.log(e)
        }
    }

    async getAllCars(req, res) {
        try {
            const cars = await Car.find({})
            res.json(cars)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new carsController()
