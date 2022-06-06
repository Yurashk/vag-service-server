const User = require("../models/User")
const Role = require("../models/Role")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator")
const {secret} = require("../config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "48h"})
}

class authController {

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "ошибка при регистрации", errors})
            }
            const {phone, password} = req.body; // get params from request
            const candidate = await User.findOne({phone})
            if (candidate) { // check if candidate already exist
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 5); // hash password

            const user = new User({phone, password: hashPassword}); // create user
            await user.save() // save user
            return res.json({message: "Пользователь успешно зарегестрирован"})
        } catch (e) {
            console.log(e);
            res.status(400).json(e)

        }
    }

    async login(req, res) {
        try {
            const {phone, password} = req.body; // get params from request
            const user = await User.findOne({phone});
            if (!user) {
                return res.status(404).json({message: `Пользователя с ${phone} не существует`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Пароль не верный`})
            }
            // const token = jwt.sign({id: user.id}, config.get('secret'),{expiresIn: "1h"})
            const token = generateAccessToken(user._id,user.phone)

            return res.json({
                access_token: token
            })
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Login error"})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
    // async getOneUser(req,res) {
    //     try {
    //
    //         const id = req.params.id;
    //         const user = await User.findById(id)
    //         res.json(user)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
}

module.exports = new authController()
