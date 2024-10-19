const {Schema, model} = require("mongoose")

const productSchema = new Schema({
    payment_info: {
        type: Object,
        required: true
    },
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
        required: [true, "Descrição do produto é obrigátorio."]
    },
    "img": {
        type: String,
        required: [true, "Imagem do produto não recebida."]
    }
},{timestamps: true})

const productModel = model("Products", productSchema)

module.exports = productModel