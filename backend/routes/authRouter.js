const express=require('express')
const authRouter=express.Router();

const {login,register,adminLogin}=require('../controller/userController')
authRouter.post('/login',login).post('/signUp',register).post('/adminLogin',adminLogin);
module.exports=authRouter;