const userModel = require("../model/userModel")

const Services = require("../Services/Services")
const endPointReturn = require("../utils/endPointReturn")
const service = new Services(userModel)

class UserController{
    static async findAllUser(req,res,next){
        const users = await service.findAll()
        
        const msg = endPointReturn("Todos os usuario registrados.", users, 200)
        return res.status(200).json(msg)
    }
}

module.exports = UserController