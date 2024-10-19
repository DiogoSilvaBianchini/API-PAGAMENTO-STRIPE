const express = require("express")
const ProductController = require("../controller/productControlle")
const upload = require("../config/multer")

const router = express.Router()

router.get("/product", express.json(), ProductController.getAll)
router.post("/product",upload.single("img"), ProductController.createNewProductStripe, ProductController.create)
router.post("/product/payment/checkout", express.json(), ProductController.createCheckOut)
router.put("/product/:id", express.json(), ProductController.update)
router.delete("/product/:id", express.json(), ProductController.delete)

module.exports = router