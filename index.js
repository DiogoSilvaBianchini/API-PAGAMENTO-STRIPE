require("dotenv").config()
const express = require("express")
const morgan = require("morgan")

const app = express()
const PORT = process.env.PORT || 8082

app.use(morgan("dev"))


app.listen(PORT, () => console.log("ok"))
