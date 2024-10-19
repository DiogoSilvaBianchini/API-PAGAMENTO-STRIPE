const productModel = require("../model/productModel")
const Service = require("../Services/Services")
const endPointReturn = require("../utils/endPointReturn")
const stripe = require("stripe")(process.env.GETWAY_SECRET_KEY)
const fs = require("fs")

const productService = new Service(productModel)

class ProductController{

    static async createNewProductStripe(req,res,next){
        try {
            const {title, description, price} = req.body

            const product = await stripe.products.create({
                name: title,
                description
            })

            const priceProduct = await stripe.prices.create({
                unit_amount: Math.floor(price * 100),
                currency: 'brl',
                product: product.id
            })
            const stripeProduct = {productId: product.id, priceId: priceProduct.id}
            next(stripeProduct)
        } catch (error) {
            next(error)
        }
    }

    static async createCheckOut(req,res,next){
        const {listProduct} = req.body
        
        try {
            const query = listProduct.map(product => product.id)
            const findProducts = await productModel.find({_id: {$in: query}}, ["payment_info"])
            
            const items = findProducts.map(product => {
                const request = listProduct.filter(items => items.id == product._id)
                return {price: product.payment_info.price_id, quantity: request[0].quantity}
            })
           
            const session = await stripe.checkout.sessions.create({
                success_url: 'http://localhost:5173',
                line_items: items,
                mode: 'payment'
            })
            
            const msg = endPointReturn("Checkout criado com sucesso!", session.url, 200)

            return res.status(200).json(msg)
        } catch (error) {
            
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

    static async create(stripeProduct,req, res, next){
        try {
            const {title, price, describe, stock} = req.body
            await productService.register({payment_info: {product_id: stripeProduct.productId, price_id: stripeProduct.priceId}, title, price: Number(price), describe, stock: Number(stock), img: req.file.filename})
            
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

            const findProduct = await productService.findOne({_id: id})

            await fs.unlink(`../frontend/public/productImages/${findProduct.img}`, (err) => {
                if(err){
                    console.log(err)
                }
            })

            await stripe.products.update(findProduct.strip_product_id, {active: false})
            const products = await productService.delete(id)

            const msg = endPointReturn("Produto removido com sucesso.", products, 201)
            return res.status(201).json(msg)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController