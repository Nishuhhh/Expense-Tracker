const express = require('express')
const cors = require('cors') 
const bodyParser = require('body-parser')
const path = require('path') ;
require('dotenv').config()

const sequelize = require('./util/database')
const userRoutes = require('./routes/user')
const homeRoutes = require('./routes/home')
const forgotRoutes = require('./routes/forgot')

const Expense = require('./models/expense')
const Order =  require('./models/order')
const User = require('./models/user');
const ForgetPassword = require("./models/forgotPassword")
//const { FORCE } = require('sequelize/types/index-hints');
const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(userRoutes);
app.use(homeRoutes);
app.use(forgotRoutes);

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(ForgetPassword)
ForgetPassword.belongsTo(User);




sequelize.sync().then((res) =>{
    app.listen(5000);

}).catch((err) =>{
    console.log(err, "jja'j'fj'ajf'");
})