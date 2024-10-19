const bcrypt = require("bcryptjs")
const endPointReturn = require("../utils/endPointReturn")
const userModel = require("../model/userModel")
const Services = require("../Services/Services")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
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

        if(!findUser){
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

const authToken = async (req,res,next) => {
    try {
        const {authorization} = req.headers
        const verifyToken = await jwt.verify(authorization, process.env.JWT_SECRET_TOKEN)
        console.log(verifyToken)
        let msg

        if(verifyToken){
            msg = endPointReturn("Token validado com sucesso!", authorization, 200)
        }else{
            msg = endPointReturn("Token inválido", false, 401)
        }
        return res.status(200).json(msg)
    } catch (error) {
        next(error)
    }
}


const searchUserByEmail = async (req, res, next) => {
    try {
        const {email} = req.body
        const findUser = await service.findOne({email})
        if(findUser){
            const payLoad = {email, id: findUser._id}
            next(payLoad)
        }else{
            const msg = endPointReturn("E-mail não registrado.", false, 200)
            return res.status(200).json(msg)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    encryptedPassword,
    authUser,
    searchUserByEmail,
    authToken
}