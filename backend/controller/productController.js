const product=require('../models/Product')
const {v2:cloudinary}=require('cloudinary')
const listProducts=async(req ,res)=>{

    try {
         const allProducts=await product.find({});
         res.json({success:true,allProducts});
    } catch (error) {
        console.log(error);
        res.json({success:false,msg:error})
    }
   

}
const addProduct=async(req ,res)=>{
try {
    const {name,description,price,category,subCategory,sizes,bestSeller}=req.body;
    const image1=req.files.image1&&req.files.image1[0]
    const image2=req.files.image2&&req.files.image2[0]
    const image3=req.files.image3&&req.files.image3[0]
    const image4=req.files.image4&&req.files.image4[0]


    const images=[image1,image2,image3,image4].filter((item)=>item!==undefined);
    //we cannot upload this images directly on db so first we will upload on cloudinary then from there we will get url and we will add to db
    let imagesUrl=await Promise.all(images.map(async(item)=>{
        let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
        return result.secure_url;
    }))
    //after this all image has uploaded on cloudinary and we will get url of all here
    const productData={
        name,description,category,subCategory,image:imagesUrl,price:Number(price),sizes:JSON.parse(sizes),bestSeller:bestSeller==='true',date:Date.now()
    }
    // {
//   "sizes": "[\"S\", \"M\", \"L\"]"
// } to 
// {
//   "sizes": ["S", "M", "L"]
// }


   await product.create(productData)
    console.log(productData);
    res.json({success:true,productData})
} catch (error) {
    console.log(error);
    res.json({success:false,msg:'Internal server error'})
}
}
const removeProduct=async(req ,res)=>{
try {
    const {id}=req.params;
    console.log('inside remove product');
    console.log(id);
    const pdt=await product.findOneAndDelete({_id:id});
    res.json({success:true,msg:'Removed successful'});
} catch (error) {
    console.log(error);
    res.json({success:false,msg:error})
}
}
const singleProduct=async(req ,res)=>{
try {
    const {id}=req.params;
    const pdt=await product.findOne({_id:id});
    res.json({success:true,pdt});
} catch (error) {
    console.log(error);
    res.json({success:false,msg:error})
}
}
module.exports={listProducts,addProduct,removeProduct,singleProduct}