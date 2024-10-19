const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const {encryptedPassword, authUser, searchUserByEmail, authToken} = require("../middlewares/userMiddlewares")

router.get("/user", express.json(), userController.findAllUser)
router.get("/user/checkToken", express.json(), authToken)
router.post("/user", express.json(), encryptedPassword, userController.createUser)
router.post("/user/login", express.json(), authUser, userController.createAToken)
router.post("/user/oAuth/login", express.json(), searchUserByEmail, userController.createAToken)
router.put("/user/:id", express.json(), userController.update)
router.delete("/user/:id", express.json(), userController.delete)

module.exports = router