const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const {encryptedPassword} = require("../middlewares/userMiddlewares")

router.get("/user", express.json(), userController.findAllUser)
router.post("/user", express.json(), encryptedPassword, userController.createUser)
router.put("/user/:id", express.json(), userController.update)
router.delete("/user/:id", express.json(), userController.delete)

module.exports = router