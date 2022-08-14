const User = require('../models/user') 
const bcrypt = require('bcrypt') ;
const {json} = require('body-parser')
const saltRounds = 10 ;
const jwt = require('jsonwebtoken')

exports.postSignup = async(req, res, next)=>{
    let userDetail = req.body 

    let existingUser = await User.findAll({where:{email:userDetail.email}}) ;

    if(existingUser.length === 0)
    {
        const hashedPassword = bcrypt.hashSync(userDetail.password , saltRounds) ;
        let newUSer= await User.create({
            name : userDetail.name ,
            email : userDetail.email ,
            phoneNumber : userDetail.phone ,
            password : hashedPassword ,
            isPremium : false
        })
        res.json({flag:true , msg : "User Created"})

        
    }
    else
    {
        res.json({flag:false ,  msg :"User already exist"});
    }
}

exports.postLogin =async(req,res,next) =>{

    const email = req.body.email;
    console.log(req)
    const password = req.body.password;
    

    let users = await User.findAll({where:{email : email}})
    console.log(users);

    if(users.length>0)
    {
      const dbid = users[0].id
      const dbpass = users[0].password 
      const dbname = users[0].name 
      const dbemail = users[0].email


      const match = await bcrypt.compare(password,dbpass)
      console.log(match);
      if(match)
      {
         const token = jwt.sign(dbid,'d4b0f29b1877137109172a1ed62067fa9351a507f7e8e6ffbdde9252df37870137891da68fc8a215f95a91cda7bcd0d342b190487d51457073bb514ede01861b')
         res.status(200).json({msg:'Login Successfull' , token : token ,  email : dbemail ,  name : dbname})
      }
      else
      {
        res.status(401).json({msg : 'User not authorised'})
      
    }
    
   
    }
    else{
        res.status(404).json({msg:'user not found'})


    }

}

