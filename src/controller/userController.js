const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")

const Services = require("../Services/Services")
const endPointReturn = require("../utils/endPointReturn")
const service = new Services(userModel)

class UserController{
    static async findAllUser(req,res,next){
        try {
            const users = await service.findAll({}, ["-password", "-fone"])
            const msg = endPointReturn("Todos os usuario registrados.", users, 200)
            return res.status(200).json(msg)
        } catch (error) {
            next(error)
        }
    }

    static async createUser(hash, req, res, next){
        try {
            const {name, email, fone} = req.body

            await service.register({name, email, password: hash, fone})

            const msg = endPointReturn("Usuario registrado com sucesso", false, 201)

            return res.status(201).json(msg)
        } catch (error) {
            next(error)
        }
    }

    static async update(req,res,next){
        try {
            const {name, email, fone} = req.body
            const {id} = req.params
            let payload = {}

            if(name) payload.name = name
            if(email) payload.name = email
            if(fone) payload.fone = fone

            await service.update(id, payload)

            const msg = endPointReturn("Dados atualizados com sucesso.", true, 201)
            return res.status(201).json(msg)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req,res,next){
        try {
            const {id} = req.params
            await service.delete(id)
            const msg = endPointReturn("Usuario removido com sucesso", false, 201)
            return res.status(200).json(msg)
        } catch (error) {
            next(error)
        }
    }

    static async createAToken(payLoad, req, res, next){
        try {
            const token = jwt.sign(payLoad, process.env.JWT_SECRET_TOKEN, {expiresIn: '24h'})
            const msg = endPointReturn("Token criado com sucesso.", token, 200)
            return res.status(200).json(msg)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController