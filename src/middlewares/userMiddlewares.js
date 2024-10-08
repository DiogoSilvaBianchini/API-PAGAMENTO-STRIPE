const bcrypt = require("bcryptjs")


const encryptedPassword = async (req, res, next) => {
    try {
        const {password} = req.body

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        next(hash)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    encryptedPassword
}