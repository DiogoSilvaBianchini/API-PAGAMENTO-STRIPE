const productModel = require("../model/productModel")
const Service = require("../Services/Services")
const endPointReturn = require("../utils/endPointReturn")
const stripe = require("stripe")(process.env.GETWAY_SECRET_KEY)

const productService = new Service(productModel)

class ProductController{

    static async payment(req,res,next){
        try {
            const {id} = req.params

            const findProduct = await productService.findOne({_id: id})

            const payment = await stripe.paymentIntents.create({
                amount: Math.floor(findProduct.price) * 100,
                currency: "brl",
                payment_method: 'pm_card_visa',
                "description": findProduct.title
            })

            console.log(payment)
            return res.status(200).json({msg: "ok"})
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req,res,next){
        try {
            const products = await productService.findAll({})
            const msg = endPointReturn("Produtos registrados", products, 200)
            return res.status(200).json(msg)
        } catch (error) {
            next(error)
        }
    }

    static async getById(req,res,next){
        try {
            const {id} = req.params
            const product = await productService.findById(id)
            const msg = endPointReturn("Produto encontrado.", product, 200)
            return res.status(200).json(msg)
        } catch (error) {
            next(error)
        }
    }

    static async create(req,res,next){
        try {
            const {title, price, describe, stock} = req.body
            await productService.register({title, price, describe, stock})
            const msg = endPointReturn("Produto registrado com sucesso.", true, 201)
            return res.status(201).json(msg)
        } catch (error) {
            next(error)
        }
    }

    static async update(req,res,next){
        try {
            const {id} = req.params
            const {title, price, describe, stock} = req.body
            const payload = {}

            if(title) payload.title = title
            if(price) payload.price = price
            if(describe) payload.describe = describe
            if(stock) payload.stock = stock

            await productService.update(id, payload) 
            const msg = endPointReturn("Produto atualizado com sucesso.", true, 201)
            return res.status(201).json(msg)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req,res,next){
        try {
            const {id} = req.params
            await productService.delete(id)
            const msg = endPointReturn("Produto removido com sucesso.", true, 201)
            return res.status(201).json(msg)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController