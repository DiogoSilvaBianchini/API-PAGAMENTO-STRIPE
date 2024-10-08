const express = require("express")
const router = express.Router()

router.get("/", (req,res) => res.status(200).json({msg: "Servidor rodando", results: false, status: 200}))

module.exports = router