const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
cartData:{type:Object,default:{}},

},{minimize:false});
module.exports=mongoose.model('User',userSchema);

// minimize false means if we do not send cartData it will assume it as empty object minimize: false → keep empty objects {} in MongoDB.