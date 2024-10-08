const bcrypt = require("bcryptjs")
const endPointReturn = require("../utils/endPointReturn")
const userModel = require("../model/userModel")
const Services = require("../Services/Services")
const bcryptjs = require("bcryptjs")

const service = new Services(userModel)

const encryptedPassword = async (req, res, next) => {
    try {
        const {password} = req.body

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        next(hash)
    } catch (error) {
        next(error)
    }
}

const authUser = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const findUser = await service.findOne({email}, ["email", "password"])
        let msg
        let payLoad = {}

        if(findUser.length == 0){
            msg = endPointReturn("E-mail ou senha incorreto.", false, 400)
            return res.status(400).json(msg)
        }
        
        const compare = await bcryptjs.compare(password, findUser.password)
        
        if(!compare){
            msg = endPointReturn("E-mail ou senha incorreto.", false, 400)
            return res.status(400).json(msg)
        }else{
            payLoad = {id: findUser._id, email: findUser.email}
            return next(payLoad)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    encryptedPassword,
    authUser
}