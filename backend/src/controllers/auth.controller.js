const User = require("../models/user.model");

async function userRegistration(req, res) {
  const { fullname, email, password } = req.body;
  
  const  isUserExist = await User.findOne({email:email})

  if(isUserExist){
    res.status(400).json({
      message:"this email is already registered with us!"
    })
  }
 if(!isUserExist){
  
  if( !fullname || !email || !password){
    res.status(400).json({ message:"registration failed, fill required fields"})
  }
  else{
   await User.create({
      fullname,
      email,
      password
    })

    res.status(201).json({
      message:"successfully registered the user",
    })
  }
 }
}

async function userLogin(req,res){
  const {email,password} = req.body
  const user = await User.findOne({email:email}).select("+password")

  if(!user){
    res.status(400).json({
      message:"invalid email or password"
    })}
    else if(user.password !== password){
      res.status(400).json({
      message:"invalid email or password"
    })}
    else{
      res.status(200).json({
        message:"loggedin successfully",
        user:user
      })
    }
  }
    

module.exports = {
  userRegistration,
  userLogin,
};
