const userModel = require('../models/user')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class UserController {
    static async RegisterUser(req, res) {
        const {
            name,
            email,
            password,
            phone
        } = req.body
        const newUser = await new userModel({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            phone,
        })
        let payload = {
            subject: newUser._id
        }
        let token = jwt.sign(payload, 'secretKey')
        newUser.save()
            .then(data => {
                res.status(200).json({
                    message: 'Register Success',
                    'token': token,
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Register Failed',
                    err
                })
            })
    }

    static async getAllUser(req, res) {
        try {
            const user = await userModel.find()
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    static async LoginUser(req, res) {
        const {
            email,
            password
        } = req.body
        const user = await userModel.findOne({
            email
        })
        if (!user) {
            res.status(400).json({
                message: 'User not found'
            })
        }
        if (bcrypt.compareSync(password, user.password)) {
            let payload = {
                subject: user._id
            }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).json({
                message: 'Login Success',
                id: user._id,
                'token': token,
                name: user.name,
                saldo: user.saldo
            })
        } else {
            res.status(400).json({
                message: 'Wrong Password'
            })
        }
    }

    static async loginbyphone(req, res) {
        const {
            phone
        } = req.body
        const user = await userModel.findOne({
            phone
        })
        if (!user) {
            res.status(400).json({
                message: 'User not found'
            })
        }
        let payload = {
            subject: user.id
        }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).json({
            message: 'Login Success',
            id: user.id,
            'token': token,
            name: user.name,
            saldo: user.saldo
        })
    }

    static async addSaldo(req, res) {
        const {userId} = req.params.id
        const {
            saldo
        } = req.body
        const user = await userModel.findById(userId)
        const saldoo = await userModel.findOneAndUpdate({saldo:saldo})
        if (!user) {
            res.status(400).json({
                message: 'User not found'
            })
        }
        userModel.findByIdAndUpdate(userId, {
               $set:{saldo: saldo + saldoo},
            }, {
                new: true
            })
            .then(data => {
                res.setHeader("Content-Type", "text/html");
                res.status(200).json({
                    message: 'Add Saldo Success',
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Add Saldo Failed',
                    err
                })
            })

    }

    static getUserDetail(req, res) {
        const id = req.params.id
        userModel.findById(id)
            .then(data => {
                res.status(200).json({
                    message: 'Get User Detail Success',
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Get User Detail Failed',
                    err
                })
            })
    }
    static async getInformationSaldo(req, res) {
        const id = req.params.id
        const user = await userModel.findOne({
            _id: id
        })
        if (!user) {
            res.status(400).json({
                message: 'User not found'
            })
        }
        res.status(200).json({
            message: 'Your information saldo is',
            name: user.name,
            saldo: user.saldo
        })
    }


}

module.exports = UserController