require("dotenv").config()
require("./src/config/db")
const express = require("express")
const morgan = require("morgan")
const router = require("./src/router/index")

const app = express()
const PORT = process.env.PORT || 8082

app.use(morgan("dev"))
app.use(router)

app.use((error, req, res, next) => {
    console.log(error)
    return res.status(500).json({msg: "Algo deu errado", results: false, status: 500})
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
