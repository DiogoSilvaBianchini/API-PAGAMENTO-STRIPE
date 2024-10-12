const express = require("express")
const ProductController = require("../controller/productControlle")

const router = express.Router()

router.get("/product", express.json(), ProductController.getAll)
router.post("/product", express.json(), ProductController.create)
router.post("/product/payment/:id", express.json(), ProductController.payment)
router.post("/product/create", express.json(), ProductController.createNewProductStripe)
router.put("/product/:id", express.json(), ProductController.update)
router.delete("/product/:id", express.json(), ProductController.delete)

module.exports = router