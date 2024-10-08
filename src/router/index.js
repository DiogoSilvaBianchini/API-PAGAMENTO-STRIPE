const express = require("express")
const router = express.Router()
const userRouter = require("./userRouter")
const productRouter = require("./productRouter")

router.get("/", (req,res) => res.status(200).json({msg: "Servidor rodando", results: false, status: 200}))
router.use(userRouter, productRouter)


module.exports = router