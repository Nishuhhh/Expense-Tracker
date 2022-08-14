const jwt = require('jsonwebtoken')
const User = require("../models/user")

exports.authenticateToken = (req , res, next) =>{
    
        console.log(req)
        const token = req.header('authorization')
        console.log(token);
        const userId = jwt.verify(token , `${process.env.TOKEN_SECRET}`)
        console.log(userId)
        User.findByPk(userId)
        .then((user) =>{
            req.user = user ;
            next()
        }).catch(err=>{
            throw new Error(err);
        })
        
        // next()

        

    
}

