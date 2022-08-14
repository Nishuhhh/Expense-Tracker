const User = require('../models/user')
const Expense = require('../models/expense')
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const {json} = require('body-parser')
const saltRounds = 10 ;
const jwt = require('jsonwebtoken')

exports.postExpenses = (req,res,next) =>{
    const Expense = req.body.expense;
    req.user.createExpense({
        amount : Expense.amount ,
        description : Expense.description ,
        category : Expense.category

    })
    .then(result =>{
      res.status(200).json({result, msg: "Expense added"})
    })
    .catch(err =>{
        console.log(err);
        res.status(402).json({msg : "Not added"})
    })

} 
 
exports.getAllExpenses = (req, res, next)=>{
    req.user.getExpenses()
    .then(expenses=>{
        res.json({expenses})
    }).catch(err=>console.log(err))

}
exports.getExpenseTotals = async (req ,res, next)=>{
const totalAmount = await Expense.findAll({

    attributes :[
        'userId' ,
        [Sequelize.fn('sum' , Sequelize.col('amount')) , 'total_amount']
    ] ,
    group :['userId'],
    raw : true 

})

totalAmount.sort((a,b) => b.total_amount - a.total_amount)


for(let i=0 ; i<totalAmount.length ; i++)
{
    let user = await User.findAll({

        attributes: ['name'],
        where: {id : totalAmount[i].userId}
    })

    totalAmount[i] ={...totalAmount[i] , name : user[0].name} 
}
console.log(totalAmount)
res.json({totalAmount})
}


exports.postDeleteExpense = (Req, res ,next) =>{
    let expId = req.body.id
    Expense.destroy({where :{id : expId}})
    .then(()=>{
        res.send("Removed")
    }).catch(err=> console.log(err)) ;
}

exports.getUserDetails = (req , res, next) =>{
    let premium = req.user.dataValues.isPremium;
    res.json({premium});
}