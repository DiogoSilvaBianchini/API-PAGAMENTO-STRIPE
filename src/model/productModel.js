const {Schema, model} = require("mongoose")

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, "Titulo do produto é obrigátorio."]
    },
    price: {
        type: Number,
        required: [true, "Preço do produto é obrigátorio."]
    },
    stock: {
        type: Number,
        required: [true, "Numero de peças em estoque é obrigátorio."]
    },
    describe: {
        type: String,
        required: [true, "Descrição do produto é obrigátorio"]
    }
},{timestamps: true})

const productModel = model("Products", productSchema)