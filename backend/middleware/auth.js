const jwt=require('jsonwebtoken')
require('dotenv').config();
const authUser=async(req,res,next)=>{
try {
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,msg:'not authorized login again'})
    }
    const token_decode=jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId=token_decode.id;
    next();

} catch (error) {
    res.json({success:false,msg:'internal server error of type 4'})
}
}
module.exports={authUser}