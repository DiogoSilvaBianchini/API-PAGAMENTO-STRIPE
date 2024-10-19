const mongoose = require("mongoose")
const {NODE_ENV, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT} = process.env


if(NODE_ENV == "development"){
    mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@0.0.0.0:${DB_PORT}/${DB_NAME}?authSource=admin`)
}else{
    mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`)
}

mongoose.connection.on("error", (err) => console.error(`Erro ao conectar o banco de dados: ${err}`))
mongoose.connection.once("open", () => console.log("Banco de dados conectado."))