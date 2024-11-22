const express = require('express')
const userController = require('../controllers/user_controller')

const userRouter = express.Router()

userRouter.post('/add-account',userController.addUserAccount)
userRouter.post('/register',userController.register)


module.exports = userRouter