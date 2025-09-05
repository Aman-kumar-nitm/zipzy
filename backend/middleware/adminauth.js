require('dotenv').config();
const jwt=require('jsonwebtoken')
const adminAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers;
        if(!token){
            return res.json({success:false,msg:'you are not authorized'})
        }
        //create one token using jwt
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
        //if they matches means admin
        console.log(tokenDecode);
        if(tokenDecode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
           return res.json({success:false,msg:'you are not allowed to access this'})
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,msg:'internal server errror'})
    }
}
module.exports=adminAuth