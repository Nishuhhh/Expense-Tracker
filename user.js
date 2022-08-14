

 const express = require('express')
 const router = express.Router()
 const userController = require('../controllers/user')
 const authorization = require('../authorization/autorrization')

 router.post('/signup', userController.postSignup)
 router.post('/login', userController.postLogin)
 router.get('/getExpenses' , authorization.authenticateToken )


 
 module.exports = router