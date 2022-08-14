const express= require('express')
const userController = require('../controllers/home')
const authorization = require('../authorization/autorrization')
const homecontrollers = require('../controllers/home')
const orderController = require('../controllers/order')

const router = express.Router();

router.post('/home/addExpense' ,authorization.authenticateToken , homecontrollers.postExpenses)
router.get('/home/getExpenses'  ,  authorization.authenticateToken , homecontrollers.getAllExpenses)
router.get('/home'   , authorization.authenticateToken ,homecontrollers.getUserDetails )
router.get('/home/purchasepremium' ,authorization.authenticateToken, orderController.purchasepremium)
router.post('/home/updateTransactionStatus',authorization.authenticateToken , orderController.updateTransactionStatus)

router.get('/home/leaderboard',authorization.authenticateToken , homecontrollers.getExpenseTotals)

router.post('/home/deleteExpense',authorization.authenticateToken , homecontrollers.postDeleteExpense)


module.exports = router ;