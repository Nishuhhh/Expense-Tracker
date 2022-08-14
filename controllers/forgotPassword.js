//const sgMail = require("@sendgrid/mail");
const ForgetPassword = require("../models/forgotPassword");
const User = require("../models/user");



const uuid = require("uuid");

const bcrypt = require("bcrypt");
exports.forgotPassword = async (req, res) => {
    var email = req.body.email;
  
    console.log(req.body.email);
    await User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        const id = uuid.v4();
        user.createForgotpassword({ id, active: true })
          .catch((err) => {
            throw new Error(err);
          });

          res.status(200).send(`http://localhost:5000/resetpassword/${id}`);
}
    })
}
exports.resetPassword=(req,res)=>{
   const id=req.params.id

   ForgetPassword.findOne({where:{id:id}}).then(forgotPassword=>{
     if(forgotPassword){

       //console.log(forgotPassword.active)
       if(!forgotPassword.active){
        res.status(200).send(
          `
          <html>
          <h1> link is expired <h1>
          </html>`
        )

       }
      forgotPassword.update({active:false});
      res.status(200).send(`<html>
      <script>
          function formsubmitted(e){
              e.preventDefault();
              console.log('called')
          }
      </script>
      <body>
      <form action="/updatepassword/${id}" method="get">
          <label for="newpassword">Enter New password</label>
          <input name="newpassword" type="password" required></input>
          <button>reset password</button>
      </form>
      </body>
  </html>`
  ) 
   res.end()
     }
     else{
      
     }
   })

}

exports.updatePassword=(req,res)=>{
  const newpassword=req.query.newpassword;
  //console.log(req.body)
  const id=req.params.id

  ForgetPassword.findOne({where:{id}}).then(forgotpassword=>{
    // console.log(forgotpassword.userId)
    User.findOne({where:{id:forgotpassword.userId}}).then(async(user)=>{
      // console.log(user)
      if(user){
        const saltRounds=10;
        bcrypt.hash(newpassword, saltRounds, function (err, hash) {
          
          
          //console.log(hash)
          user.update({
              password: hash
             
            })
              .then(() => {
                res.status(200).send(
                  `
                  <html>
                  <h1> password changed sucessfully</h1>
                  </html>`
                )
              }
              )
              .catch((err) => {
                console.log(err);
               
              });
        });
      }
      else{
        res.json({msg:"user doesnt exists"})
      }
    })
  })
  .catch(err=>{
    console.log(err)
  })


}