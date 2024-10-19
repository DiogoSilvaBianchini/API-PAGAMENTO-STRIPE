const multer = require("multer")

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/productImages')
    },
    filename: (req, file, cb) => {
        cb(null, "product-"+ Date.now() + "-" + file.originalname)
    }
})

module.exports = multer({storage: storageConfig})