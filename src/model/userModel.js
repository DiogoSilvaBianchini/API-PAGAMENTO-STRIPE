const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Nome de usuario obrigátorio."]
    },
    email: {
        type: String,
        required: [true, "E-mail é obrigátorio."]
    },
    password: {
        type: String,
        required: [true, "Senha é obrigátorio"]
    },
    fone: {
        type: Number,
        required: [true, "Numero de telefone é obrigátorio"]
    },
    "purchase_history": {
        type: Array,
        default: []
    }
}, {timeseries: true})

const userModel = model("Users", userSchema)

module.exports = userModel