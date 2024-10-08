const express = require("express")
const router = express.Router()
const userRouter = require("./userRouter")

router.get("/", (req,res) => res.status(200).json({msg: "Servidor rodando", results: false, status: 200}))
router.use(userRouter)


module.exports = router