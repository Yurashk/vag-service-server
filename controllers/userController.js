const User = require("../models/User")

class userController {
    async getOneUser(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id)
            res.json({
                userData: {
                    id: user.id,
                    bonuses: user.bonuses ? user.bonuses : 0
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    async addUserBonuses(req, res) {
        try {
            const {id, bonuses} = req.body;
            let user = await User.findById(id)
            console.log(user)
            if (!user) {
                return res.status(404).json({message: `Пользователя  не существует`})
            }
            user.bonuses += 25;
            await user.save();
            res.json(user.bonuses)
        } catch (e) {
            console.log(e)
        }
    }
    async removeUserBonuses(req, res) {
        try {
            const {id, bonuses} = req.body;
            let user = await User.findById(id)
            console.log(user)
            if (!user) {
                return res.status(404).json({message: `Пользователя  не существует`})
            }
            if(user.bonuses<bonuses){
                return res.status(405).json({message: `Количества бонусов не достаточно`})
            }
            user.bonuses -= bonuses;
            await user.save();
            res.json(user.bonuses)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new userController()
