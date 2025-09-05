const User=require('../models/UserModel')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
require('dotenv').config()
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
    
    //find one user with this email and verify password
    const userIs=await User.findOne({email});
    if(!userIs){
        return res.json({success:false,msg:'not registered'})
    }
    //check password
    const isValid=await bcrypt.compare(password,userIs.password);
    if(!isValid){
        return res.json({success:false,msg:'invalid password'})
    }



    const token=createToken(userIs._id);
    res.json({success:true,token})
    } catch (error) {
        console.log(error);
         res.json({success:false,msg:error})
    }
    

}
const register=async(req,res)=>{
try {
    const {name,email,password}=req.body;
    //check is there any user already exists
    const exists=await User.findOne({email});
    if(exists){
        return res.json({success:false,msg:'user already exists with this email'})
    }
    //validate email
    if(!validator.isEmail(email)){
        return res.json({success:false,msg:'email is invalid'})
    }
    if(password.length<8){
        return res.json({success:false,msg:'weak password'})
    }
    //hash password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const userCreated=await User.create({name,email,password:hashedPassword});
    //login user
    const token=createToken(exists._id);


    res.json({success:true,userCreated,token})


} catch (error) {
    console.log(error);
    res.json({success:false,msg:'Internal Server Error'})
}
}
const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD){
            //generate token and send
            const token=jwt.sign(email+password,process.env.JWT_SECRET);
            console.log(token);
            res.json({success:true,token})
        }else{
            res.json({success:false,msg:'invalid credentials'})
        }
   
    
    } catch (error) {
          console.log(error);
          res.json({success:false,msg:'Internal Server Error'})  
    }
}
module.exports={login,register,adminLogin};